import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({ component: Component, ...rest }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { isAuthenticated, loading } = useSelector(state => state.auth);

	return (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated && !loading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default privateRoute;
