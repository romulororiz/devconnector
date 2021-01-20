import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, getCurrentUserProfile } from '../../actions/profile';
import { DashboardActions } from './DashboardActions';
import Experience from '../dashboard/Experience';
import Education from './Education';
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
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />

					<div className='my-2' onClick={() => dispatch(deleteAccount())}>
						<button className='btn btn-danger'>
							<i className='fas fa-user-minus'></i> Delete my account
						</button>
					</div>
				</Fragment>
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
