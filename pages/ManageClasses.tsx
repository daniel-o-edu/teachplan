
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CurricularUnit } from '../types';
import { Plus, Edit2, Trash2, X, Save, ExternalLink } from 'lucide-react';

const ManageClasses: React.FC = () => {
  const { units, addUnit, updateUnit, deleteUnit } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<CurricularUnit | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<CurricularUnit>>({
    name: '',
    code: '',
    shift: '',
    location: '',
    diary: '',
    driveLink: '',
    description: ''
  });

  const openModal = (unit?: CurricularUnit) => {
    if (unit) {
      setEditingUnit(unit);
      setFormData(unit);
    } else {
      setEditingUnit(null);
      setFormData({
        name: '',
        code: '',
        shift: '',
        location: '',
        diary: '',
        driveLink: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUnit(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return; // Simple validation

    const unitToSave: CurricularUnit = {
      id: editingUnit ? editingUnit.id : Date.now().toString(),
      name: formData.name!,
      code: formData.code!,
      shift: formData.shift || 'Noite',
      location: formData.location || '',
      diary: formData.diary || '',
      driveLink: formData.driveLink || '',
      description: formData.description || ''
    };

    if (editingUnit) {
      updateUnit(unitToSave);
    } else {
      addUnit(unitToSave);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta turma?')) {
      deleteUnit(id);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto mb-16 md:mb-0">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-sans font-normal text-gray-800 mb-1">
            Gerenciar Turma
          </h1>
          <p className="text-gray-500 text-sm">
            Cadastre e atualize as informações das Unidades Curriculares.
          </p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-google-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm w-fit"
        >
          <Plus size={18} />
          Nova Turma
        </button>
      </header>

      {/* Table for Desktop */}
      <div className="hidden md:block bg-white rounded-xl border border-google-border overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Código</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Nome da UC</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Turno</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Local</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Links</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {units.map(unit => (
              <tr key={unit.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm font-medium text-gray-900">{unit.code}</td>
                <td className="p-4 text-sm text-gray-700">{unit.name}</td>
                <td className="p-4 text-sm text-gray-600">{unit.shift}</td>
                <td className="p-4 text-sm text-gray-600">{unit.location || '-'}</td>
                <td className="p-4 text-sm text-google-blue">
                   <div className="flex gap-2">
                     {unit.diary && <a href={unit.diary} target="_blank" title="Diário" className="hover:underline"><ExternalLink size={16}/></a>}
                     {unit.driveLink && <a href={unit.driveLink} target="_blank" title="Drive" className="hover:underline"><ExternalLink size={16}/></a>}
                   </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openModal(unit)} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(unit.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Mobile */}
      <div className="md:hidden space-y-4">
        {units.map(unit => (
          <div key={unit.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-700">{unit.code}</span>
              <div className="flex gap-2">
                <button onClick={() => openModal(unit)} className="text-gray-500"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(unit.id)} className="text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">{unit.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{unit.shift} • {unit.location}</p>
            <div className="flex gap-4 text-sm text-google-blue mt-2">
               {unit.diary && <a href={unit.diary} target="_blank" className="flex items-center gap-1">Diário <ExternalLink size={12}/></a>}
               {unit.driveLink && <a href={unit.driveLink} target="_blank" className="flex items-center gap-1">Drive <ExternalLink size={12}/></a>}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-medium text-gray-800">{editingUnit ? 'Editar Turma' : 'Nova Turma'}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome da UC</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-google-blue/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Código da Turma</label>
                  <input 
                    type="text" 
                    value={formData.code} 
                    onChange={e => setFormData({...formData, code: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-google-blue/50"
                    placeholder="Ex: ADAG - V5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Turno</label>
                  <select 
                    value={formData.shift} 
                    onChange={e => setFormData({...formData, shift: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-google-blue/50"
                  >
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                  </select>
                </div>
              </div>

               <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Local</label>
                <input 
                  type="text" 
                  value={formData.location} 
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-google-blue/50"
                  placeholder="Ex: Lab 03"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição</label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-google-blue/50"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Link Diário de Classe</label>
                  <input 
                    type="url" 
                    value={formData.diary} 
                    onChange={e => setFormData({...formData, diary: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-google-blue/50"
                    placeholder="https://..."
                  />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Link Google Drive</label>
                  <input 
                    type="url" 
                    value={formData.driveLink} 
                    onChange={e => setFormData({...formData, driveLink: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-google-blue/50"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-google-blue text-white rounded hover:bg-blue-600 shadow-sm"
                >
                  <Save size={16} />
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
