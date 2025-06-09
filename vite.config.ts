// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 예: 저장소 이름이 'interest-rate-app'이라면 '/interest-rate-app/' 으로 설정
  base: '/my_bot/',
})