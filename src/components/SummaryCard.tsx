import React from 'react'
// CORREÇÃO: Usar 'import type' para IconType, pois ele é usado apenas como um tipo.
import type { IconType } from 'react-icons'
import { BsBoxes, BsBookmarkHeart, BsShuffle } from 'react-icons/bs'
import { GiOpenBook } from 'react-icons/gi'
import '../styles/SummaryCard.css'

interface SummaryCardProps {
  title: string
  value: number
  Icon: IconType // Usado aqui como tipo
}

// NOTE: Este 'iconMap' no seu código original não é usado pelo componente,
// mas o mantive para fins de integridade do código que você enviou.
const iconMap: { [key: string]: IconType } = {
  matches: BsShuffle,
  collection: GiOpenBook,
  wishlist: BsBookmarkHeart,
  activeTrades: BsBoxes,
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, Icon }) => {
  return (
    <div className="summary-card">
      <div className="card-header">
        <p className="card-title">{title}</p>
        <Icon className="card-icon" />
      </div>
      <h2 className="card-value">{value}</h2>
    </div>
  )
}

export default SummaryCard
