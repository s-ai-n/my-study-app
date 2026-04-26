"use client";
import React, { useState, useEffect, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Simple UI replacements for Card and Button
const Card = ({ children }: { children: React.ReactNode }) => (
  <div style={{ border: '1px solid #333', background: '#111', padding: '20px', borderRadius: '12px', marginBottom: '15px' }}>
    {children}
  </div>
);

const Button = ({ children, onClick }: any) => (
  <button 
    onClick={onClick} 
    style={{ background: 'white', color: 'black', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', margin: '5px', border: 'none' }}
  >
    {children}
  </button>
);

export default function Page() {
  const [subject, setSubject] = useState("Law");
  const [accuracy, setAccuracy] = useState(60);
  const [sessions, setSessions] = useState(0);
  const [history, setHistory] = useState<any>([]);
  const [examDate, setExamDate] = useState("");
  const [weakTopics, setWeakTopics] = useState<string[]>([]);

  const daysLeft = examDate 
    ? Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
    : null;

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory((h: any) => [...h.slice(-19), { t: Date.now(), v: accuracy }]);
    }, 4000);
    return () => clearInterval(interval);
  }, [accuracy]);

  return (
    <div style={{ padding: '40px', background: 'black', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px' }}>AUTOPILOT AI A-LEVEL TUTOR</h1>
      
      {/* DASHBOARD STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <Card><p style={{ opacity: 0.6 }}>Sessions</p><h2 style={{ fontSize: '1.5rem' }}>{sessions}</h2></Card>
        <Card><p style={{ opacity: 0.6 }}>Accuracy</p><h2 style={{ fontSize: '1.5rem' }}>{accuracy}%</h2></Card>
        <Card><p style={{ opacity: 0.6 }}>Grade</p><h2 style={{ fontSize: '1.5rem' }}>{accuracy > 80 ? "A" : accuracy > 65 ? "B" : "C"}</h2></Card>
        <Card><p style={{ opacity: 0.6 }}>Weak Topics</p><h2 style={{ fontSize: '1.5rem' }}>{weakTopics.length}</h2></Card>
      </div>

      <Card>
        <h2 style={{ marginBottom: '10px' }}>Exam Countdown</h2>
        <input type="date" onChange={e => setExamDate(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: 'none', marginRight: '15px' }} />
        {daysLeft !== null && <span style={{ fontSize: '1.1rem' }}>{daysLeft} days remaining</span>}
      </Card>

      <Card>
        <h2 style={{ marginBottom: '15px' }}>Autopilot Progress</h2>
        <div style={{ width: '100%', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <XAxis dataKey="t" hide />
              <YAxis domain={[0, 100]} stroke="#666" />
              <Tooltip contentStyle={{ background: '#222', border: 'none' }} />
              <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '30px 0' }}>
        {["Law", "Geography", "Economics"].map(s => (
          <Button key={s} onClick={() => setSubject(s)}>{s}</Button>
        ))}
      </div>

      <p style={{ textAlign: 'center', opacity: 0.5 }}>Currently studying: <strong>{subject}</strong></p>
    </div>
  );
}
