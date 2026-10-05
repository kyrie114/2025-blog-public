'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import { CARD_SPACING } from '@/consts'
import shareList from '@/app/share/list.json'
import Link from 'next/link'
import { HomeDraggableLayer } from './home-draggable-layer'

type ShareItem = {
	name: string
	url: string
	logo: string
	description: string
	tags: string[]
	stars: number
}

export default function ShareCard() {
	const center = useCenterStore()
	const { cardStyles, siteContent } = useConfigStore()
	const [randomItem, setRandomItem] = useState<ShareItem | null>(null)
	const [ready, setReady] = useState(false)
	const styles = cardStyles.shareCard
	const hiCardStyles = cardStyles.hiCard
	const socialButtonsStyles = cardStyles.socialButtons

	useEffect(() => {
		if (!shareList.length) {
			setRandomItem(null)
		} else {
			const randomIndex = Math.floor(Math.random() * shareList.length)
			setRandomItem(shareList[randomIndex])
		}
		setReady(true)
	}, [])

	const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + hiCardStyles.width / 2 - socialButtonsStyles.width
	const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y + hiCardStyles.height / 2 + CARD_SPACING + socialButtonsStyles.height + CARD_SPACING

	return (
		<HomeDraggableLayer cardKey='shareCard' x={x} y={y} width={styles.width} height={styles.height}>
			<Card order={styles.order} width={styles.width} height={styles.height} x={x} y={y}>
				{siteContent.enableChristmas && (
					<>
						<img
							src='/images/christmas/snow-12.webp'
							alt='Christmas decoration'
							className='pointer-events-none absolute'
							style={{ width: 120, left: -12, top: -12, opacity: 0.8 }}
						/>
					</>
				)}

				<h2 className='text-secondary text-sm'>{randomItem ? '随机推荐' : '推荐分享'}</h2>

				{!ready ? (
					<div className='mt-2 flex h-[100px] items-center justify-center'>
						<span className='text-secondary text-xs'>加载中...</span>
					</div>
				) : randomItem ? (
					<Link href='/share' className='mt-2 block space-y-2'>
						<div className='flex items-center'>
							<div className='relative mr-3 h-12 w-12 shrink-0 overflow-hidden rounded-xl'>
								<img src={randomItem.logo} alt={randomItem.name} className='h-full w-full object-contain' />
							</div>
							<h3 className='text-sm font-medium'>{randomItem.name}</h3>
						</div>

						<p className='text-secondary line-clamp-3 text-xs'>{randomItem.description}</p>
					</Link>
				) : (
					<Link href='/about' className='mt-2 block space-y-2 transition-opacity hover:opacity-80'>
						<p className='text-sm font-medium'>内容线</p>
						<p className='text-secondary text-xs leading-relaxed'>AI工程从零 / 矩阵方法跟读</p>
						<p className='text-secondary text-xs'>清单筹备中 · 去了解 kyrie →</p>
					</Link>
				)}
			</Card>
		</HomeDraggableLayer>
	)
}
