'use client';

import { useState } from 'react';

export default function PriceCalculator() {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 150;
  const shippingFee = quantity > 0 ? 50 : 0;
  const discount = quantity >= 5 ? 100 : 0;
  const total = quantity * pricePerItem + shippingFee - discount;

  return (
    <div className="mx-auto max-w-xl space-y-8">
      {/* Header */}
      <section className="rounded-3xl border border-zinc-200/90 bg-white p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-0.5 text-xs font-semibold text-zinc-700">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
            Interactive Calculator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            เครื่องคำนวณราคา (Price Calculator)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            ทดลองคำนวณราคาสินค้าแบบ Real-time พร้อมสรุปใบเสร็จ
          </p>
        </div>

        {/* Input Controls */}
        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
              จำนวนสินค้า (ชิ้น)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-base font-bold text-zinc-800 transition hover:bg-zinc-100 cursor-pointer"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-center text-lg font-bold text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
              />
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-base font-bold text-zinc-800 transition hover:bg-zinc-100 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-5 text-sm space-y-3">
            <div className="flex justify-between text-zinc-600">
              <span>ราคาต่อชิ้น</span>
              <span className="font-mono font-medium">{pricePerItem.toLocaleString()} บาท</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>ราคาสินค้ารวม ({quantity} ชิ้น)</span>
              <span className="font-mono font-medium">{(quantity * pricePerItem).toLocaleString()} บาท</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>ค่าจัดส่ง</span>
              <span className="font-mono font-medium">{shippingFee.toLocaleString()} บาท</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-zinc-800 font-semibold">
                <span>ส่วนลดพิเศษ (สั่ง 5 ชิ้นขึ้นไป)</span>
                <span className="font-mono">-{discount.toLocaleString()} บาท</span>
              </div>
            )}
            <div className="border-t border-zinc-200 pt-3 flex justify-between items-center text-zinc-950">
              <span className="font-bold text-base">ยอดรวมสุทธิ</span>
              <span className="font-mono text-2xl font-black">{total.toLocaleString()} บาท</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}