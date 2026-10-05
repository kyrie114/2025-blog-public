import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useLatestBlog } from '@/hooks/use-blog-index'
import { useConfigStore } from './stores/config-store'
import { CARD_SPACING } from '@/consts'
import dayjs from 'dayjs'
import Link from 'next/link'
import { HomeDraggableLayer } from './home-draggable-layer'

const CONTENT_LINES = [
	{ label: 'AI', title: 'AI工程从零' },
	{ label: '矩阵', title: '矩阵方法跟读' }
] as const

export default function ArticleCard() {
	const center = useCenterStore()
	const { cardStyles, siteContent } = useConfigStore()
	const { blog, loading } = useLatestBlog()
	const styles = cardStyles.articleCard
	const hiCardStyles = cardStyles.hiCard
	const socialButtonsStyles = cardStyles.socialButtons

	const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + hiCardStyles.width / 2 - socialButtonsStyles.width - CARD_SPACING - styles.width
	const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y + hiCardStyles.height / 2 + CARD_SPACING

	return (
		<HomeDraggableLayer cardKey='articleCard' x={x} y={y} width={styles.width} height={styles.height}>
			<Card order={styles.order} width={styles.width} height={styles.height} x={x} y={y} className='space-y-2 max-sm:static'>
				{siteContent.enableChristmas && (
					<>
						<img
							src='/images/christmas/snow-9.webp'
							alt='Christmas decoration'
							className='pointer-events-none absolute'
							style={{ width: 140, left: -12, top: -16, opacity: 0.8 }}
						/>
					</>
				)}

				<h2 className='text-secondary text-sm'>最新文章</h2>

				{loading ? (
					<div className='flex h-[60px] items-center justify-center'>
						<span className='text-secondary text-xs'>加载中...</span>
					</div>
				) : blog ? (
					<Link href={`/blog/${blog.slug}`} className='flex transition-opacity hover:opacity-80'>
						{blog.cover ? (
							<img src={blog.cover} alt='cover' className='mr-3 h-12 w-12 shrink-0 rounded-xl border object-cover' />
						) : (
							<div className='text-secondary mr-3 grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/60'>+</div>
						)}
						<div className='flex-1'>
							<h3 className='line-clamp-1 text-sm font-medium'>{blog.title || blog.slug}</h3>
							{blog.summary && <p className='text-secondary mt-1 line-clamp-3 text-xs'>{blog.summary}</p>}
							<p className='text-secondary mt-3 text-xs'>{dayjs(blog.date).format('YYYY/M/D')}</p>
						</div>
					</Link>
				) : (
					<Link href='/blog' className='block space-y-2.5 transition-opacity hover:opacity-80'>
						<p className='text-secondary text-xs leading-relaxed'>写作筹备中 · 两条内容线</p>
						<ul className='space-y-1.5'>
							{CONTENT_LINES.map(line => (
								<li key={line.title} className='flex items-center gap-2 text-xs'>
									<span className='bg-brand/15 text-brand shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium'>{line.label}</span>
									<span className='font-medium'>{line.title}</span>
								</li>
							))}
						</ul>
					</Link>
				)}
			</Card>
		</HomeDraggableLayer>
	)
}
