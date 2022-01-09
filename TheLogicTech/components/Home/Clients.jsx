import { Swiper, SwiperSlide } from 'swiper/react';
import Quote from '@mui/icons-material/FormatQuoteRounded';
import Image from 'next/image'

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from 'swiper';

import quote from '../../public/icons/quote.png';
import will from '../../public/clients/will.jpg';
import alicia from '../../public/clients/alicia.jpg';
import tinus from '../../public/clients/tinus.jpg';

SwiperCore.use([EffectCoverflow, Autoplay]);

const Review = ({ review, profile, name, work }) => {
	return (
		<div className="bg-[#fff] rounded w-[24rem] h-[22rem] review-card shadow-xl pt-20 px-4 items-center flex flex-col gap-10 relative">
			<div className="right-10 absolute top-2">
				{/* <Quote color="action" sx={{ fontSize: 56 }} /> */}
				<Image src={quote} alt="quote" height={64} width={64}/>
			</div>
			<div className="text-justify text-gray-700">{review}</div>
			<div className="absolute border-2 bottom-4 rounded-full flex w-4/5 gap-6">
				<Image src={profile} alt="profile" className="rounded-full" height={80} width={80}/>
				<div className="font-medium text-gray-800 pt-3 text-[15px] md:text-base">
					{name}
					<div className="text-gray-600 text-[12px] md:text-sm">{work}</div>
				</div>
			</div>
		</div>
	);
};

export default function App() {
	return (
		<>
			<div className="bg-gradient-to-r from-blue-500 to-blue-700 px-10 pt-2 pb-20">
				<div className="dancing capitalize text-5xl md:text-7xl text-gray-200 font-bold text-center my-10">
					Our Clients
				</div>
					<Swiper
						effect={'coverflow'}
						grabCursor={true}
						centeredSlides={true}
						slidesPerView={1}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
						breakpoints={{
							720: {
								slidesPerView: 2,
							},
							980: {
								slidesPerView: 3,
							},
						}}
						coverflowEffect={{
							rotate: 0,
							stretch: 0,
							depth: 100,
							modifier: 2,
							slideShadows: false,
						}}
						loop={true}
						pagination={true}
						className="client-swiper"
					>
						<SwiperSlide>
							<Review
								review="Best website very helpful in managing events i the best one yet. The bestest feature my wedding great because this site exits wow"
								name="Will Bates"
								profile={will}
								work="Worker at Linux"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<Review
								review="Best website very helpful in managing events i the best one yet. The bestest feature my wedding great because this site exits wow"
								name="Tinus Lorva"
								profile={tinus}
								work="NVIDIA Enthusiast"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<Review
								review="Best website very helpful in managing events i the best one yet. The bestest feature my wedding great because this site exits wow"
								name="Alicia"
								profile={alicia}
								work="CEO Moueser"
							/>
						</SwiperSlide>
					</Swiper>
				</div>
		</>
	);
}
