import React from 'react'
import { Navbar } from '../components/Navbar' // Navbar no topo do layout

// Componentes principais
import SummaryCards from '../components/SummaryCards'
import MatchList from '../components/MatchList'
import QuickActions from '../components/QuickActions'
import RecentActivity from '../components/RecentActivity'
import TopTradersList from '../components/TopTradersList'

import '../styles/HomePage.css' // Estilo do layout

export function HomePage() {
  return (
    <div className="homepage-layout">
      {/* Navbar fixada fora do container principal */}
      <Navbar />

      <main className="dashboard-content">
        <h1 className="dashboard-title">Dashboard de Matches</h1>
        <p className="dashboard-subtitle">
          Encontre trocas perfeitas para sua coleção
        </p>

        {/* Linha de cards de resumo */}
        <SummaryCards />

        {/* Grid principal */}
        <div className="dashboard-grid">
          {/* Coluna principal: lista de matches */}
          <section className="main-column">
            <MatchList />
          </section>

          {/* Coluna lateral: ações rápidas, atividades e top traders */}
          <aside className="sidebar-column">
            <QuickActions />
            <RecentActivity />
            <TopTradersList />
          </aside>
        </div>
      </main>
    </div>
  )
}
