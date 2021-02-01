import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import Spinner from '../layout/Spinner';

const Profile = ({ match }) => {
	const dispatch = useDispatch();
	const { profile, loading } = useSelector(state => state.profile);
	const auth = useSelector(state => state.auth);

	useEffect(() => {
		dispatch(getProfileById(match.params.id));
	}, [dispatch, match.params.id]);

	return (
		<Fragment>
			{profile == null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to={'/profiles'} className='btn btn-light'>
						Back to Profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to={'/edit-profile'} className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
				</Fragment>
			)}
			<div className='profile-grid my-1'>
				{profile ? <ProfileTop profile={profile} /> : null}
				{profile ? <ProfileAbout profile={profile} /> : null}
				<div className='profile-exp bg-white p-2'>
					<h2 className='text-primary'>Experience</h2>
					{profile && profile.experience.length > 0 ? (
						<Fragment>
							{profile.experience.map(experience => (
								<ProfileExperience
									key={experience._id}
									experience={experience}
								/>
							))}
						</Fragment>
					) : (
						<h4>No experience credentials</h4>
					)}
				</div>
				<div className='profile-edu bg-white p-2'>
					<h2 className='text-primary'>Education</h2>
					{profile && profile.education.length > 0 ? (
						<Fragment>
							{profile.education.map(education => (
								<ProfileEducation key={education._id} education={education} />
							))}
						</Fragment>
					) : (
						<h4>No education credentials</h4>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Profile;
