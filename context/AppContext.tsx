
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Lesson, CurricularUnit, AppContextType, Status } from '../types';
import { MOCK_LESSONS, MOCK_UNITS } from '../constants';

// Interface extending basic AppContextType to include sync status
interface ExtendedAppContextType extends AppContextType {
  cloudUrl: string;
  isSyncing: boolean;
  syncError: string | null;
  setCloudUrl: (url: string) => void;
  manualSync: () => Promise<void>;
  fetchFromCloud: () => Promise<void>;
}

const AppContext = createContext<ExtendedAppContextType | undefined>(undefined);

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    console.error(`Erro ao carregar chave ${key} do localStorage`, e);
    return defaultValue;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>(() => 
    loadFromStorage('teacherplan_lessons', MOCK_LESSONS)
  );
  const [units, setUnits] = useState<CurricularUnit[]>(() => 
    loadFromStorage('teacherplan_units', MOCK_UNITS)
  );

  // Online / Cloud Configuration
  const [cloudUrl, setCloudUrl] = useState<string>(() => localStorage.getItem('teacherplan_cloud_url') || '');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('teacherplan_lessons', JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem('teacherplan_units', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    if(cloudUrl) {
      localStorage.setItem('teacherplan_cloud_url', cloudUrl);
      // Try to load on initial mount if URL exists
      fetchFromCloud(); 
    }
  }, [cloudUrl]);

  // Load data FROM Cloud (GET)
  const fetchFromCloud = async () => {
    if (!cloudUrl) return;
    
    // Validate URL format roughly
    if (!cloudUrl.startsWith('http')) {
      setSyncError("URL inválida.");
      return;
    }

    setIsSyncing(true);
    setSyncError(null);
    try {
      // Append timestamp to prevent caching issues with Google Apps Script
      const separator = cloudUrl.includes('?') ? '&' : '?';
      const fetchUrl = `${cloudUrl}${separator}t=${Date.now()}`;

      const response = await fetch(fetchUrl);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message || 'Erro no script');
      }

      if (data.lessons && Array.isArray(data.lessons)) {
        setLessons(data.lessons);
      }
      if (data.units && Array.isArray(data.units)) {
        setUnits(data.units);
      }
    } catch (err: any) {
      console.error("Erro ao baixar dados:", err);
      setSyncError("Falha ao baixar dados. Verifique a URL ou a permissão 'Anyone' no Script.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Sync TO Cloud (POST)
  const syncToCloud = async (newLessons: Lesson[], newUnits: CurricularUnit[]) => {
    if (!cloudUrl) return;
    
    setIsSyncing(true);
    setSyncError(null);
    try {
      // Google Apps Script requires 'no-cors' for POST requests from browser.
      // We do NOT set 'Content-Type': 'application/json' because it triggers a CORS preflight 
      // (OPTIONS) request which GAS does not support. 
      // We send the JSON as a plain text body.
      await fetch(cloudUrl, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', 
        },
        body: JSON.stringify({ lessons: newLessons, units: newUnits })
      });
      
      // Since no-cors returns an opaque response, we assume success if no network error is thrown.
      // We cannot read the response body to check for specific script errors.
      console.log('Dados enviados para nuvem (no-cors)');
    } catch (err) {
      console.error("Cloud sync failed", err);
      setSyncError("Falha na sincronização online (Envio).");
    } finally {
      setIsSyncing(false);
    }
  };

  // Wrapper for manual trigger
  const manualSync = async () => {
    await syncToCloud(lessons, units);
  };

  const updateLessonStatus = (id: string, status: Status) => {
    const updated = lessons.map(l => l.id === id ? { ...l, status } : l);
    setLessons(updated);
    syncToCloud(updated, units);
  };

  const updateLessonObservation = (id: string, text: string) => {
    const updated = lessons.map(l => l.id === id ? { ...l, observations: text } : l);
    setLessons(updated);
    syncToCloud(updated, units);
  };

  const updateLessonLink = (id: string, link: string) => {
    const updated = lessons.map(l => l.id === id ? { ...l, link } : l);
    setLessons(updated);
    syncToCloud(updated, units);
  };

  const addUnit = (unit: CurricularUnit) => {
    const updated = [...units, unit];
    setUnits(updated);
    syncToCloud(lessons, updated);
  };

  const updateUnit = (updatedUnit: CurricularUnit) => {
    const updated = units.map(u => u.id === updatedUnit.id ? updatedUnit : u);
    setUnits(updated);
    syncToCloud(lessons, updated);
  };

  const deleteUnit = (id: string) => {
    const updated = units.filter(u => u.id !== id);
    setUnits(updated);
    syncToCloud(lessons, updated);
  };

  return (
    <AppContext.Provider value={{ 
      lessons, 
      units, 
      updateLessonStatus, 
      updateLessonObservation, 
      updateLessonLink,
      addUnit,
      updateUnit,
      deleteUnit,
      cloudUrl,
      setCloudUrl,
      isSyncing,
      syncError,
      manualSync,
      fetchFromCloud
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
