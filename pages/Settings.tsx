
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Save, Cloud, Download, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

const Settings: React.FC = () => {
  const { cloudUrl, setCloudUrl, isSyncing, syncError, manualSync, fetchFromCloud } = useApp();
  const [urlInput, setUrlInput] = useState(cloudUrl);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  const handleSave = () => {
    const cleanUrl = urlInput.trim();
    setCloudUrl(cleanUrl);
    setUrlInput(cleanUrl); // Update input to show cleaned version
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto mb-16 md:mb-0">
      <header className="mb-8">
        <h1 className="text-2xl font-sans font-normal text-gray-800 mb-1">
          Configurações
        </h1>
        <p className="text-gray-500 text-sm">
          Gerencie a conexão com seu banco de dados no Google Drive.
        </p>
      </header>

      <div className="bg-white rounded-xl border border-google-border shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 flex items-center gap-2 mb-4">
            <Cloud className="text-google-blue" size={24} />
            Sincronização Online (Google Sheets)
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                URL do Google Apps Script (Web App)
              </label>
              <div className="flex flex-col md:flex-row gap-3">
                <input 
                  type="text" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://script.google.com/macros/s/..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-google-blue/50"
                />
                <button 
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 bg-google-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm whitespace-nowrap"
                >
                  <Save size={18} />
                  Salvar URL
                </button>
              </div>
              {saveStatus === 'saved' && (
                <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
                  <CheckCircle2 size={12} /> URL salva com sucesso!
                </p>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
              <p className="font-medium mb-1">Como configurar:</p>
              <ol className="list-decimal pl-4 space-y-1 text-blue-700/80">
                <li>Crie uma planilha no Google Sheets.</li>
                <li>Vá em <strong>Extensões &gt; Apps Script</strong>.</li>
                <li>Cole o código do servidor e clique em <strong>Implantar (Deploy)</strong> como Web App.</li>
                <li>Defina acesso como <strong>"Anyone" (Qualquer pessoa)</strong>.</li>
                <li>Copie a URL gerada e cole acima.</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-800">Status da Conexão</p>
            {isSyncing ? (
              <span className="text-google-blue flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-google-blue rounded-full animate-pulse"></span>
                Sincronizando...
              </span>
            ) : syncError ? (
              <span className="text-google-red flex items-center gap-2 mt-1">
                <AlertCircle size={14} />
                {syncError}
              </span>
            ) : cloudUrl ? (
              <span className="text-google-green flex items-center gap-2 mt-1">
                <CheckCircle2 size={14} />
                Pronto para sincronizar
              </span>
            ) : (
              <span className="text-gray-400 mt-1">Offline (URL não configurada)</span>
            )}
          </div>

          <div className="flex gap-3 w-full md:w-auto">
             <button 
              onClick={fetchFromCloud}
              disabled={!cloudUrl || isSyncing}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              <Download size={16} />
              Baixar da Nuvem
            </button>
            <button 
              onClick={manualSync}
              disabled={!cloudUrl || isSyncing}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              <Upload size={16} />
              Enviar Dados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
