// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, ref, onValue, set } from '../firebase';
import { vignettesData, colors } from '../data/vignettes';

// Simple password for admin access - change this for production
const ADMIN_PASSWORD = 'eaii2024';

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [responses, setResponses] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedVignette, setSelectedVignette] = useState(0); // 0 = All vignettes
  const [selectedTeam, setSelectedTeam] = useState('all');

  // Check if already authenticated this session
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  // Listen to Firebase for real-time updates
  useEffect(() => {
    if (!isAuthenticated) return;

    const responsesRef = ref(db, 'responses');
    const participantsRef = ref(db, 'participants');

    const unsubResponses = onValue(responsesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setResponses(Object.values(data));
      } else {
        setResponses([]);
      }
    });

    const unsubParticipants = onValue(participantsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setParticipants(Object.values(data));
      } else {
        setParticipants([]);
      }
    });

    return () => {
      unsubResponses();
      unsubParticipants();
    };
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleClearData = async () => {
    if (window.confirm('Are you sure you want to clear all response data? This cannot be undone.')) {
      try {
        await set(ref(db, 'responses'), null);
        await set(ref(db, 'participants'), null);
        alert('All data cleared successfully');
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('Error clearing data');
      }
    }
  };

  // Get unique teams
  const getUniqueTeams = () => {
    const teams = new Set();
    responses.forEach(r => {
      if (r.participant?.team) teams.add(r.participant.team);
    });
    return Array.from(teams).sort();
  };

  // Calculate team summary with category totals
  const calculateTeamSummary = () => {
    const teamData = {};
    
    responses.forEach(response => {
      const teamName = response.participant?.team || 'Unknown';
      const vignetteId = response.vignetteId;
      
      // Filter by selected vignette
      if (selectedVignette !== 0 && vignetteId !== selectedVignette) return;
      
      if (!teamData[teamName]) {
        teamData[teamName] = {
          name: teamName,
          state: response.participant?.state || '',
          members: new Set(),
          vignettesCompleted: new Set(),
          totals: { PROGRAM: 0, GREY: 0, MLE: 0 },
          byVignette: {}
        };
      }
      
      teamData[teamName].members.add(response.participant?.name);
      teamData[teamName].vignettesCompleted.add(vignetteId);
      
      // Add category counts
      if (response.categoryCounts) {
        teamData[teamName].totals.PROGRAM += response.categoryCounts.PROGRAM || 0;
        teamData[teamName].totals.GREY += response.categoryCounts.GREY || 0;
        teamData[teamName].totals.MLE += response.categoryCounts.MLE || 0;
      }
      
      // Store by vignette for detailed view
      if (!teamData[teamName].byVignette[vignetteId]) {
        teamData[teamName].byVignette[vignetteId] = { PROGRAM: 0, GREY: 0, MLE: 0, responses: [] };
      }
      if (response.categoryCounts) {
        teamData[teamName].byVignette[vignetteId].PROGRAM += response.categoryCounts.PROGRAM || 0;
        teamData[teamName].byVignette[vignetteId].GREY += response.categoryCounts.GREY || 0;
        teamData[teamName].byVignette[vignetteId].MLE += response.categoryCounts.MLE || 0;
      }
      teamData[teamName].byVignette[vignetteId].responses.push(response);
    });

    return Object.values(teamData).map(team => ({
      ...team,
      memberCount: team.members.size,
      vignettesCount: team.vignettesCompleted.size,
      totalResponses: team.totals.PROGRAM + team.totals.GREY + team.totals.MLE
    })).sort((a, b) => a.name.localeCompare(b.name));
  };

  // Calculate activity-level consensus for a team
  const getActivityConsensus = (teamName, vignetteId) => {
    const vignette = vignettesData.find(v => v.id === vignetteId);
    if (!vignette) return [];

    const activityCounts = {};
    vignette.activities.forEach(a => {
      activityCounts[a.id] = { PROGRAM: 0, GREY: 0, MLE: 0, text: a.text };
    });

    responses.forEach(response => {
      if (response.vignetteId !== vignetteId) return;
      if (teamName !== 'all' && response.participant?.team !== teamName) return;
      
      response.answers?.forEach(answer => {
        if (answer.answer && activityCounts[answer.activityId]) {
          activityCounts[answer.activityId][answer.answer]++;
        }
      });
    });

    return Object.entries(activityCounts).map(([id, counts]) => ({
      id: parseInt(id),
      ...counts
    }));
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-gray-800 rounded-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🔐</span>
            </div>
            <h1 className="text-xl font-bold text-white">Admin Access</h1>
            <p className="text-gray-400 text-sm mt-1">Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full px-4 py-3 bg-gray-700 border rounded-xl text-white placeholder-gray-400 outline-none ${
                passwordError ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
              }`}
            />
            {passwordError && (
              <p className="text-red-400 text-sm mt-2">Incorrect password</p>
            )}
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
            >
              Access Dashboard
            </button>
          </form>
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 py-2 text-gray-400 hover:text-white text-sm"
          >
            ← Back to Exercise
          </button>
        </div>
      </div>
    );
  }

  const teamSummary = calculateTeamSummary();
  const uniqueTeams = getUniqueTeams();
  const completedTeams = teamSummary.filter(t => t.vignettesCount >= vignettesData.length).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Team Response Summary</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleClearData}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-all"
            >
              Clear All Data
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-all"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-5">
            <div className="text-4xl font-bold text-green-400">
              {completedTeams}/{teamSummary.length || 0}
            </div>
            <div className="text-gray-400 text-sm mt-1">Teams Completed</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-5">
            <div className="text-4xl font-bold text-blue-400">{responses.length}</div>
            <div className="text-gray-400 text-sm mt-1">Total Submissions</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-5">
            <div className="text-4xl font-bold text-purple-400">{participants.length}</div>
            <div className="text-gray-400 text-sm mt-1">Participants</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-5">
            <div className="text-4xl font-bold text-amber-400">{vignettesData.length}</div>
            <div className="text-gray-400 text-sm mt-1">Vignettes</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Filter by Vignette</label>
            <select
              value={selectedVignette}
              onChange={(e) => setSelectedVignette(Number(e.target.value))}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border-0 outline-none min-w-48"
            >
              <option value={0}>All Vignettes</option>
              {vignettesData.map(v => (
                <option key={v.id} value={v.id}>Vignette {v.id}: {v.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">Filter by Team</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border-0 outline-none min-w-48"
            >
              <option value="all">All Teams</option>
              {uniqueTeams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Team Summary Table */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Team Category Summary</h2>
          
          {teamSummary.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              Waiting for teams to submit responses...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Team</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">State</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Members</th>
                    <th className="text-center py-3 px-4 font-medium" style={{ color: colors.program.bg }}>Program</th>
                    <th className="text-center py-3 px-4 font-medium" style={{ color: colors.grey.bg }}>Grey Zone</th>
                    <th className="text-center py-3 px-4 font-medium" style={{ color: colors.mle.bg }}>MLE</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Total</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {teamSummary
                    .filter(team => selectedTeam === 'all' || team.name === selectedTeam)
                    .map(team => (
                    <tr key={team.name} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-3 px-4 font-medium">{team.name}</td>
                      <td className="py-3 px-4 text-gray-400">{team.state}</td>
                      <td className="py-3 px-4 text-center">{team.memberCount}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1 rounded-full text-sm font-medium" 
                          style={{ backgroundColor: colors.program.light, color: colors.program.text }}>
                          {team.totals.PROGRAM}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1 rounded-full text-sm font-medium" 
                          style={{ backgroundColor: colors.grey.light, color: colors.grey.text }}>
                          {team.totals.GREY}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1 rounded-full text-sm font-medium" 
                          style={{ backgroundColor: colors.mle.light, color: colors.mle.text }}>
                          {team.totals.MLE}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-300">{team.totalResponses}</td>
                      <td className="py-3 px-4 text-center">
                        {team.vignettesCount >= vignettesData.length ? (
                          <span className="text-green-400">✓ Complete</span>
                        ) : (
                          <span className="text-amber-400">{team.vignettesCount}/{vignettesData.length}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Totals Row */}
                {selectedTeam === 'all' && teamSummary.length > 0 && (
                  <tfoot>
                    <tr className="bg-gray-700/50 font-semibold">
                      <td className="py-3 px-4" colSpan={3}>OVERALL TOTAL</td>
                      <td className="py-3 px-4 text-center" style={{ color: colors.program.bg }}>
                        {teamSummary.reduce((sum, t) => sum + t.totals.PROGRAM, 0)}
                      </td>
                      <td className="py-3 px-4 text-center" style={{ color: colors.grey.bg }}>
                        {teamSummary.reduce((sum, t) => sum + t.totals.GREY, 0)}
                      </td>
                      <td className="py-3 px-4 text-center" style={{ color: colors.mle.bg }}>
                        {teamSummary.reduce((sum, t) => sum + t.totals.MLE, 0)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {teamSummary.reduce((sum, t) => sum + t.totalResponses, 0)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          )}
        </div>

        {/* Category Distribution Bars */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Category Distribution by Team</h2>
          
          {teamSummary.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-4">
              {teamSummary
                .filter(team => selectedTeam === 'all' || team.name === selectedTeam)
                .map(team => {
                  const total = team.totalResponses || 1;
                  return (
                    <div key={team.name} className="bg-gray-700/30 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{team.name}</span>
                        <span className="text-gray-400 text-sm">{team.totalResponses} responses</span>
                      </div>
                      <div className="flex h-8 rounded-lg overflow-hidden">
                        <div 
                          style={{ 
                            width: `${(team.totals.PROGRAM / total) * 100}%`, 
                            backgroundColor: colors.program.bg 
                          }}
                          className="flex items-center justify-center text-xs text-white font-medium"
                        >
                          {team.totals.PROGRAM > 0 && team.totals.PROGRAM}
                        </div>
                        <div 
                          style={{ 
                            width: `${(team.totals.GREY / total) * 100}%`, 
                            backgroundColor: colors.grey.bg 
                          }}
                          className="flex items-center justify-center text-xs text-white font-medium"
                        >
                          {team.totals.GREY > 0 && team.totals.GREY}
                        </div>
                        <div 
                          style={{ 
                            width: `${(team.totals.MLE / total) * 100}%`, 
                            backgroundColor: colors.mle.bg 
                          }}
                          className="flex items-center justify-center text-xs text-white font-medium"
                        >
                          {team.totals.MLE > 0 && team.totals.MLE}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          
          {/* Legend */}
          <div className="flex gap-6 mt-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.program.bg }} />
              <span className="text-sm text-gray-300">Program</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.grey.bg }} />
              <span className="text-sm text-gray-300">Grey Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.mle.bg }} />
              <span className="text-sm text-gray-300">MLE</span>
            </div>
          </div>
        </div>

        {/* Activity-Level Breakdown (when vignette selected) */}
        {selectedVignette !== 0 && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              Activity Breakdown - Vignette {selectedVignette}
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              How teams classified each activity (useful for discussion)
            </p>
            
            <div className="space-y-3">
              {getActivityConsensus(selectedTeam, selectedVignette).map((activity, idx) => {
                const total = activity.PROGRAM + activity.GREY + activity.MLE;
                if (total === 0) return null;
                
                return (
                  <div key={activity.id} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-gray-400 text-sm font-mono">{idx + 1}.</span>
                      <p className="text-sm flex-1">{activity.text}</p>
                    </div>
                    <div className="flex h-5 rounded overflow-hidden">
                      <div 
                        style={{ width: `${(activity.PROGRAM / total) * 100}%`, backgroundColor: colors.program.bg }}
                        title={`Program: ${activity.PROGRAM}`}
                      />
                      <div 
                        style={{ width: `${(activity.GREY / total) * 100}%`, backgroundColor: colors.grey.bg }}
                        title={`Grey Zone: ${activity.GREY}`}
                      />
                      <div 
                        style={{ width: `${(activity.MLE / total) * 100}%`, backgroundColor: colors.mle.bg }}
                        title={`MLE: ${activity.MLE}`}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      <span>Program: {activity.PROGRAM}</span>
                      <span>Grey: {activity.GREY}</span>
                      <span>MLE: {activity.MLE}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
