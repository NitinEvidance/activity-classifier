// src/pages/Landing.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, ref, push } from '../firebase';
import { stateOptions, teamOptions } from '../data/vignettes';

export default function Landing() {
  const navigate = useNavigate();
  const [participant, setParticipant] = useState({ name: '', state: '', team: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStart = async () => {
    if (!participant.name || !participant.state || !participant.team) return;
    
    setIsSubmitting(true);
    try {
      // Save participant to Firebase
      const participantRef = ref(db, 'participants');
      await push(participantRef, {
        ...participant,
        startTime: new Date().toISOString(),
        status: 'in-progress'
      });
      
      // Store in sessionStorage for exercise page
      sessionStorage.setItem('participant', JSON.stringify(participant));
      navigate('/exercise');
    } catch (error) {
      console.error('Error saving participant:', error);
      // Continue anyway for demo
      sessionStorage.setItem('participant', JSON.stringify(participant));
      navigate('/exercise');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">EA</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Activity Classification Exercise</h1>
            <p className="text-gray-500 mt-2">Theory of Change Framework</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={participant.name}
                onChange={(e) => setParticipant(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select
                value={participant.state}
                onChange={(e) => setParticipant(p => ({ ...p, state: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Select your state</option>
                {stateOptions.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Number</label>
              <select
                value={participant.team}
                onChange={(e) => setParticipant(p => ({ ...p, team: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Select team</option>
                {teamOptions.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={!participant.name || !participant.state || !participant.team || isSubmitting}
            className="w-full mt-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            {isSubmitting ? 'Starting...' : 'Start Exercise →'}
          </button>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Instructions:</strong> You will classify activities as Program Implementation, 
              Grey Zone, or MLE. Focus on the PRIMARY PURPOSE of each activity.
            </p>
          </div>

          {/* Admin Link */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <a
              href="/admin"
              className="text-gray-500 hover:text-blue-900 text-sm font-medium"
            >
              🔐 Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
