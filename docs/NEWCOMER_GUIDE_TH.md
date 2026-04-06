# คู่มือผู้มาใหม่ (Codebase Overview)

## 1) ภาพรวมสถาปัตยกรรม
Powerladder App เป็น Single-Page Application (SPA) ที่ใช้ **React + TypeScript + Vite** ฝั่ง frontend และใช้ **Supabase** เป็น backend-as-a-service (Auth + Postgres + Storage) โดย flow หลักคือ:

1. ผู้ใช้สมัคร/ล็อกอิน
2. กรอกข้อมูลบริบทธุรกิจในหน้า Context
3. ระบบคำนวณ Opportunity / Financial Readiness / Sweet Spot
4. จำแนกผลลัพธ์เป็น Business Play
5. บันทึกผลลงตาราง `analyses` และแสดงในหน้า Profile

## 2) โครงสร้างโฟลเดอร์ที่ควรรู้

- `src/pages/` — หน้า route หลัก (เช่น `CanvasPage`, `ContextPage`, `MainPage`, `ProfilePage`)
- `src/components/` — คอมโพเนนต์ใช้งานซ้ำ (layout, navbar, card, chart wrapper)
- `src/components/ui/` — UI primitives จาก shadcn/radix (button, input, dialog, toast ฯลฯ)
- `src/contexts/` — global context เช่น auth session
- `src/lib/` — utility และ business logic หลัก (สูตรคำนวณ/การจำแนก)
- `src/integrations/supabase/` — Supabase client + generated database types
- `supabase/migrations/` — SQL migration ของ schema/policies/storage

## 3) Entry point และระบบ routing

- Entry point อยู่ที่ `src/main.tsx` และ render `<App />`
- `src/App.tsx` เป็นตัวประกอบ provider สำคัญ:
  - React Query (`QueryClientProvider`)
  - Tooltip/Toaster
  - Router (`BrowserRouter`)
  - AuthProvider
- Routes สำคัญ:
  - Public: `/`, `/login`, `/register`, `/canvas`, `/pipeline`, `/help`
  - Protected: `/context`, `/main`, `/profile`

## 4) Auth และการป้องกันหน้า (Guard)

- `AuthProvider` ใน `src/contexts/AuthContext.tsx` จัดการ
  - session/user state
  - sign up / sign in / sign out
  - OAuth (Google ผ่าน lovable integration)
- `ProtectedRoute` ใน `src/components/ProtectedRoute.tsx` จะ redirect ไป `/login` หากยังไม่ authenticate

## 5) Business Logic ที่เป็นหัวใจ

ไฟล์ที่สำคัญที่สุดคือ `src/lib/business-logic.ts`:

- `calculateSweetSpot(...)`
  - คำนวณ Opportunity Score จาก gap ของ sales กับ inventory
  - คำนวณ Financial Risk/Readiness ผ่าน Quick Ratio (`(cash + AR) / current liabilities`)
  - รวมเป็น Sweet Spot = 0.5 * Opportunity + 0.5 * Financial
- `classifyBusinessPlay(...)`
  - แบ่งผลลัพธ์เป็น 4 กลุ่ม: Handle the Ski / Calculated Ambition / Unicorn Mistake Step / Dinosaur Hoping for Luck
- มี mapping สำหรับ zone สี/emoji และข้อความแนะนำเบื้องต้น

## 6) Data Flow ระหว่างหน้า

1. ผู้ใช้กรอกข้อมูลใน `ContextPage`
2. หน้า Context เก็บข้อมูลชั่วคราวไว้ที่ `sessionStorage`
3. `MainPage` อ่านข้อมูลจาก `sessionStorage`
4. `MainPage` คำนวณผลลัพธ์จาก business logic
5. ถ้า user login แล้ว จะ auto-save ผลเข้า Supabase table `analyses`

> จุดนี้สำคัญมาก: ตอนนี้ state หลักก่อน save ยังอาศัย `sessionStorage` ไม่ใช่ global store

## 7) โครงสร้างฐานข้อมูล (Supabase)

จาก migration ปัจจุบัน มีองค์ประกอบหลัก:

- `profiles`
  - ผูก 1:1 กับ `auth.users`
  - มี trigger auto-create profile ตอน signup
  - มี RLS ให้ user เห็น/แก้ได้เฉพาะข้อมูลตัวเอง
- `analyses`
  - เก็บผลวิเคราะห์ที่คำนวณจาก MainPage
  - มี RLS ให้ user อ่าน/เพิ่ม/ลบได้เฉพาะของตัวเอง
- Storage bucket `avatars`
  - เปิด public read
  - จำกัด insert/update/delete ตามโฟลเดอร์ user id

## 8) UI/UX และการจัดวาง

- Layout กลาง (`src/components/Layout.tsx`) ใช้ Navbar + Footer ครอบทุกหน้า
- Theme toggle และ toast มีพร้อมใช้งาน
- หลายหน้ามี animation ผ่าน framer-motion และ chart ผ่าน recharts
- มีสัดส่วนภาษาไทย/อังกฤษปนกันใน UI ซึ่งเป็นสภาพจริงของ product ตอนนี้

## 9) การทดสอบและคุณภาพโค้ด

- Test setup ใช้ Vitest แต่ตอนนี้ยังมีตัวอย่างพื้นฐาน (`src/test/example.test.ts`) เป็นหลัก
- ESLint config มีแล้วและควรรันเป็นประจำ
- ควรเพิ่ม unit test ให้ business logic ก่อนส่วนอื่น เพราะเป็นแกนของผลิตภัณฑ์

## 10) ลำดับการเรียนรู้แนะนำสำหรับผู้มาใหม่

### Step A: อ่าน flow ทั้งระบบให้จบใน 1 รอบ
1. `src/main.tsx`
2. `src/App.tsx`
3. `src/pages/ContextPage.tsx`
4. `src/pages/MainPage.tsx`
5. `src/lib/business-logic.ts`

### Step B: เข้าใจ data และ security
1. `src/integrations/supabase/client.ts`
2. `src/integrations/supabase/types.ts`
3. `supabase/migrations/*.sql`

### Step C: เริ่มลงมือแบบปลอดภัย
1. เพิ่ม unit test สำหรับสูตรคำนวณ + classification
2. แยก constants/type ที่ใช้ร่วมกันจาก page ใหญ่ๆ
3. ลดความซ้ำใน form rendering และ chart sections
4. ค่อยพัฒนา features ใหม่ (เช่น history filtering, compare analyses, richer chat)

## 11) เรื่องที่ “ต้องรู้” ก่อนแก้โค้ดจริง

- หน้า `MainPage` ค่อนข้างใหญ่และรับผิดชอบหลายอย่าง (คำนวณ + save + render dashboard)
- การแปลงชนิดข้อมูลจาก form ไป DB ใช้ `number` เยอะ ต้องระวังค่า `0`, `NaN`, และ validation
- มีการใช้ `as any` บางจุดเวลาส่งข้อมูลเข้า Supabase ซึ่งลด type safety
- หากแก้ schema ต้อง sync ทั้ง migration + generated types + code ที่เรียกใช้

## 12) Next roadmap ที่ควรทำต่อ (เชิงเทคนิค)

1. เพิ่ม test coverage ที่ `business-logic.ts` (boundary cases)
2. แยก service layer สำหรับการบันทึก/อ่าน analyses ออกจาก page component
3. ใช้ Zod schema ใน form เพื่อ validation ที่ชัดเจนและ reusable
4. เพิ่ม E2E test ของ flow `/context -> /main -> /profile`
5. วาง i18n strategy (ไทย/อังกฤษ) ให้สม่ำเสมอ

---

เอกสารนี้ตั้งใจให้เป็น “แผนที่เริ่มต้น” สำหรับ contributor ใหม่: เริ่มจาก flow หลัก, เข้าใจ business logic, แล้วค่อยขยายไป data/security/testing ตามลำดับ.
