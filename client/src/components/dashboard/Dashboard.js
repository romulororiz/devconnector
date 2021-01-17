import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = () => {
	const dispatch = useDispatch();

	const { user } = useSelector(state => state.auth);
	const { loading, profile } = useSelector(state => state.profile);

	useEffect(() => {
		dispatch(getCurrentUserProfile());
	}, [dispatch]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome, {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>Has</Fragment>
			) : (
				<Fragment>
					<p>You have not yet set up a profile, please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Dashboard;
