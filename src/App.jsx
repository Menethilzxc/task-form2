import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './App.module.css';

const fieldScheme = yup.object().shape({
	email: yup
		.string()
		.required('Поле обязательно')
		.email('Некорректный формат электронной почты'),
	password: yup
		.string()
		.required('Поле обязательно')
		.max(15, 'Максимальная длина пароля - 15 символов.')
		.min(5, 'Минимальная длина пароля - 5 символов.'),
	secondPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должно совпадать')
		.required('Подтверждение пароля обязательно'),
});

function App() {
	const [successfulReg, setSuccessfulReg] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			secondPassword: '',
		},
		resolver: yupResolver(fieldScheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const secondPasswordError = errors.secondPassword?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	const getSuccessfulReg = () => {
		setSuccessfulReg(true);
	};

	return (
		<div className={styles.root}>
			<div className={styles.App}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2>Регистрация</h2>
					{emailError && <span style={{ color: 'red' }}>{emailError}</span>}
					<input
						type="email"
						name="email"
						placeholder="Введите email"
						{...register('email')}
					/>
					{passwordError && (
						<span style={{ color: 'red' }}>{passwordError}</span>
					)}
					<input
						type="password"
						name="password"
						placeholder="Введите пароль"
						{...register('password')}
					/>
					{secondPasswordError && (
						<span style={{ color: 'red' }}>{secondPasswordError}</span>
					)}
					<input
						type="password"
						name="secondPassword"
						placeholder="Повторите пароль"
						{...register('secondPassword')}
					/>
					<button
						type="submit"
						disabled={
							!!emailError && !!passwordError && !!secondPasswordError
						}
						onClick={getSuccessfulReg}
					>
						Зарегистрироваться
					</button>
					{successfulReg === true ? (
						<div style={{ color: 'green', fontSize: '20px' }}>
							Успешная регистрация!
						</div>
					) : (
						''
					)}
				</form>
			</div>
		</div>
	);
}

export default App;
