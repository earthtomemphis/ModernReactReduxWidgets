import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Convert = ({ language, text }) => {
	const [translated, setTranslated] = useState('');
	const [debouncedText, setDebouncedText] = useState(text);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedText(text);
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [0]);

	useEffect(() => {
		const doTranslation = async () => {
			const { data } = await axios.post(
				'https://translation.googleapis.com/language/translate/v2',
				{},
				{
					params: {
						q: debouncedText,
						target: language.value,
						key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
					},
				}
			);

			setTranslated(data.data.translations[0].translatedText);
		};

		doTranslation();
	}, [language, debouncedText, text]);

	return (
		<div>
			<h1 className="ui header">{translated}</h1>
		</div>
	);
};

export default Convert;
