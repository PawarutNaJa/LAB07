'use client';

import { useEffect, useState } from 'react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadMessages() {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'GET',
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('โหลดข้อมูลไม่สำเร็จ');
      }

      const data = await res.json();

      setMessages(data.messages ?? []);
    } catch {
      setError('ไม่สามารถโหลดข้อความได้');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <main className="p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Dashboard
            </h1>

            <p className="mt-1 text-gray-600">
              หน้านี้ต้องเข้าสู่ระบบก่อน
            </p>
          </div>

          <button
            type="button"
            onClick={loadMessages}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            โหลดข้อมูลใหม่
          </button>
        </div>

        <div className="mb-6 rounded border bg-gray-50 p-4">
          <p className="font-bold">
            จำนวนข้อความที่ได้รับ
          </p>

          <p className="mt-2 text-3xl">
            {messages.length}
          </p>
        </div>

        {loading && (
          <p className="text-gray-500">
            กำลังโหลดข้อความ...
          </p>
        )}

        {error && (
          <p className="rounded bg-red-100 p-3 text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="rounded border p-4 text-gray-500">
            ยังไม่มีข้อความที่ส่งเข้ามา
          </div>
        )}

        {!loading && messages.length > 0 && (
          <div className="space-y-4">
            {messages.map((item) => (
              <article
                key={item.id}
                className="rounded border bg-white p-4 shadow-sm"
              >
                <div className="mb-3 flex flex-wrap justify-between gap-2">
                  <div>
                    <h2 className="font-bold">
                      {item.name}
                    </h2>

                    <p className="text-sm text-gray-600">
                      {item.email}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleString('th-TH')}
                  </p>
                </div>

                <p className="whitespace-pre-wrap">
                  {item.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}