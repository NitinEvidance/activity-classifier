// src/pages/Exercise.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, ref, push } from '../firebase';
import { vignettesData, colors } from '../data/vignettes';

export default function Exercise() {
  const navigate = useNavigate();
  const [participant, setParticipant] = useState(null);
  const [currentVignette, setCurrentVignette] = useState(0);
  const [responses, setResponses] = useState({});
  const [timer, setTimer] = useState(420); // 7 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Load participant from session
  useEffect(() => {
    const stored = sessionStorage.getItem('participant');
    if (stored) {
      setParticipant(JSON.parse(stored));
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Timer
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0 && !isComplete) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, isComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResponse = (vignetteId, activityId, answer) => {
    setResponses(prev => ({
      ...prev,
      [`${vignetteId}-${activityId}`]: answer
    }));
  };

  const submitVignette = async () => {
    const vignette = vignettesData[currentVignette];
    
    // Calculate category counts for this vignette
    const categoryCounts = { PROGRAM: 0, GREY: 0, MLE: 0 };
    vignette.activities.forEach(activity => {
      const answer = responses[`${vignette.id}-${activity.id}`];
      if (answer) categoryCounts[answer]++;
    });

    const vignetteResponses = {
      participant,
      vignetteId: vignette.id,
      vignetteName: vignette.title,
      timestamp: new Date().toISOString(),
      timeSpent: 420 - timer,
      categoryCounts,
      answers: vignette.activities.map(activity => ({
        activityId: activity.id,
        activityText: activity.text,
        answer: responses[`${vignette.id}-${activity.id}`] || null
      }))
    };

    // Save to Firebase
    try {
      const responsesRef = ref(db, 'responses');
      await push(responsesRef, vignetteResponses);
    } catch (error) {
      console.error('Error saving responses:', error);
    }

    // Move to next vignette or show completion
    if (currentVignette < vignettesData.length - 1) {
      setCurrentVignette(prev => prev + 1);
      setTimer(420);
    } else {
      setIsComplete(true);
    }
  };

  if (!participant) return null;

  // Show completion screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            Your responses have been submitted successfully. 
            The facilitator will review all team responses during the discussion.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500">Submitted by</p>
            <p className="font-semibold text-gray-800">{participant.name}</p>
            <p className="text-sm text-gray-600">{participant.team} • {participant.state}</p>
          </div>
          <p className="text-sm text-gray-500">
            Please wait for the facilitator to begin the group discussion.
          </p>
          <button
            onClick={() => {
              sessionStorage.clear();
              navigate('/');
            }}
            className="mt-6 px-6 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  const vignette = vignettesData[currentVignette];
  const answeredCount = vignette.activities.filter(
    a => responses[`${vignette.id}-${a.id}`]
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{participant.name} • {participant.team}</p>
              <h1 className="font-bold text-gray-800">
                Vignette {currentVignette + 1} of {vignettesData.length}
              </h1>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-mono font-bold ${timer < 60 ? 'text-red-500 animate-pulse' : 'text-gray-800'}`}>
                {formatTime(timer)}
              </div>
              <p className="text-xs text-gray-500">{answeredCount}/{vignette.activities.length} answered</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-900 to-blue-600 transition-all duration-300"
              style={{ width: `${(answeredCount / vignette.activities.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Vignette Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-1">{vignette.title}</h2>
          <p className="text-blue-200 text-sm">
            {vignette.program} • {vignette.state} • {vignette.timeline}
          </p>
        </div>

        {/* Scenario */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-sm">📋</span>
            Scenario
          </h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
            {vignette.scenario}
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {[
            { key: 'PROGRAM', label: 'PROGRAM', color: colors.program },
            { key: 'GREY', label: 'GREY ZONE', color: colors.grey },
            { key: 'MLE', label: 'MLE', color: colors.mle }
          ].map(cat => (
            <div 
              key={cat.key}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: cat.color.light, color: cat.color.text }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color.bg }} />
              {cat.label}
            </div>
          ))}
        </div>

        {/* Activities */}
        <div className="space-y-3">
          {vignette.activities.map((activity, idx) => {
            const responseKey = `${vignette.id}-${activity.id}`;
            const selected = responses[responseKey];
            
            return (
              <div key={activity.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm mb-3">{activity.text}</p>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { key: 'PROGRAM', label: 'Program', color: colors.program },
                        { key: 'GREY', label: 'Grey Zone', color: colors.grey },
                        { key: 'MLE', label: 'MLE', color: colors.mle }
                      ].map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => handleResponse(vignette.id, activity.id, opt.key)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selected === opt.key ? 'ring-2 ring-offset-2' : 'hover:opacity-80'
                          }`}
                          style={{
                            backgroundColor: selected === opt.key ? opt.color.bg : opt.color.light,
                            color: selected === opt.key ? 'white' : opt.color.text,
                            '--tw-ring-color': opt.color.bg
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit */}
        <div className="mt-6 sticky bottom-4">
          <button
            onClick={submitVignette}
            disabled={answeredCount < vignette.activities.length}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            {currentVignette < vignettesData.length - 1 
              ? `Submit & Continue to Vignette ${currentVignette + 2} →` 
              : 'Submit All Responses →'}
          </button>
        </div>
      </div>
    </div>
  );
}
