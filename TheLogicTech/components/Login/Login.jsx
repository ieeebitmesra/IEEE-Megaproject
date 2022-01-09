import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import { Divider } from '@mui/material';
import {
	signInWithGoogle,
	signInWithFb,
} from '../../config/firebase/authProvider';
import Login from './EmailLogin';

export default function Modal({ setShowLogin, setOpenFail, setOpenSuccess }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [register, setRegister] = useState(false);

	return (
		<div className="fixed h-screen w-screen top-0 left-0">
			<div
				className={`justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none px-4`}
			>
				<div className="relative mx-auto bg-bgray-50 rounded-lg">
					<div className="border-0 rounded-lg shadow-md relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<div className="flex items-center justify-between pt-3 pb-3 rounded-t ">
							<h3 className=" capitalize font-semibold text-lg text-gray-900 tracking-wide z-10 mx-auto">
								Login
							</h3>
							<button
								className="text-gray-900 absolute right-6"
								onClick={() => setShowLogin(false)}
							>
								<CloseIcon fontSize="medium" className="text-gray-700" />
							</button>
						</div>
						<hr className="border-t" />
						<div className="flex flex-col px-8 py-4 space-y-6">
							<Login
								password={password}
								email={email}
								setEmail={setEmail}
								setPassword={setPassword}
								register={register}
								setShowLogin={setShowLogin}
								setOpenFail={setOpenFail}
								setOpenSuccess={setOpenSuccess}
							/>
							{register ? (
								<div className="text-gray-600 text-center text-sm">
									Already a user?{' '}
									<span
										className="text-blue-600 cursor-pointer underline"
										onClick={() => {
											setEmail('');
											setPassword('');
											setRegister(false);
										}}
									>
										Log in{' '}
									</span>
								</div>
							) : (
								<div className="text-gray-600 text-center text-sm">
									Not a user?{' '}
									<span
										className="text-blue-600 cursor-pointer underline"
										onClick={() => {
											setEmail('');
											setPassword('');
											setRegister(true);
										}}
									>
										Register
									</span>
								</div>
							)}
							<Divider>
								<span className="font-semibold text-gray-600">OR</span>
							</Divider>
							<button
								className="bg-gray-50 active:bg-gray-100 text-gray-700 px-8 py-2 rounded outline-none focus:outline-none capitalize  shadow hover:shadow-md inline-flex items-center font-medium text-md transition-all duration-500 "
								type="button"
								onClick={async () => {
									try {
										await signInWithGoogle();
										setOpenSuccess(true);
										setShowLogin(false);
									} catch (err) {
										setOpenFail(true);
									}
								}}
							>
								<div className="flex justify-center w-full gap-4 items-center">
									<div>
										{' '}
										<FcGoogle className=" text-2xl" />
									</div>
									<div>
										<p>Sign in with Google</p>
									</div>
								</div>
							</button>
							<button
								className="bg-blue-600 active:bg-gray-100 text-gray-50 px-8 py-2 rounded outline-none focus:outline-none capitalize shadow hover:shadow-md inline-flex items-center text-md transition-all duration-500  "
								type="button"
								onClick={async () => {
									try {
										await signInWithFb();
										setOpenSuccess(true);
										setShowLogin(false);
									} catch (err) {
										setOpenFail(true);
									}
								}}
							>
								<div className="flex justify-center w-full gap-4 items-center">
									<div>
										{' '}
										<AiFillFacebook className=" text-2xl text-gray-50" />
									</div>
									<div>
										<p>Sign in with Facebook</p>
									</div>
								</div>
							</button>
						</div>
						<p className="text-center text-gray-600 text-xs my-4">
							By siging in you agree to our{' '}
							<a href="" className="text-blue-600 underline">
								terms and conditions
							</a>
						</p>
					</div>
				</div>
			</div>
			<div className="opacity-40 fixed inset-0 z-40 bg-gray-800"></div>
		</div>
	);
}
