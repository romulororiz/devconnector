import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createProfile } from '../../actions/profile';

const CreateProfile = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [formData, setFormData] = useState({
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		bio: '',
		githubusername: '',
		youtube: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		instagram: '',
	});

	const [displaySocialLinks, setDisplaySocialLinks] = useState(false);

	const {
		company,
		website,
		location,
		status,
		skills,
		bio,
		githubusername,
		youtube,
		twitter,
		facebook,
		linkedin,
		instagram,
	} = formData;

	const formDataHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		console.log(e.target.name, e.target.value);
	};

	const submitHandler = e => {
		e.preventDefault();
		dispatch(createProfile(formData, history));
	};

	return (
		<section className='container'>
			<h1 className='large text-primary'>Create Your Profile</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Let's get some information to make your
				profile stand out
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={submitHandler}>
				<div className='form-group'>
					<select name='status' value={status} onChange={formDataHandler}>
						<option value='0'>* Select Professional Status</option>
						<option value='Developer'>Developer</option>
						<option value='Junior Developer'>Junior Developer</option>
						<option value='Senior Developer'>Senior Developer</option>
						<option value='Manager'>Manager</option>
						<option value='Student or Learning'>Student or Learning</option>
						<option value='Instructor'>Instructor or Teacher</option>
						<option value='Intern'>Intern</option>
						<option value='Other'>Other</option>
					</select>
					<small className='form-text'>
						Give us an idea of where you are at in your career
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Company'
						name='company'
						value={company}
						onChange={formDataHandler}
					/>
					<small className='form-text'>
						Could be your own company or one you work for
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Website'
						name='website'
						value={website}
						onChange={formDataHandler}
					/>
					<small className='form-text'>
						Could be your own or a company website
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={formDataHandler}
					/>
					<small className='form-text'>
						City & state suggested (eg. Boston, MA)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Skills'
						name='skills'
						value={skills}
						onChange={formDataHandler}
					/>
					<small className='form-text'>
						Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Github Username'
						name='githubusername'
						value={githubusername}
						onChange={formDataHandler}
					/>
					<small className='form-text'>
						If you want your latest repos and a Github link, include your
						username
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='A short bio of yourself'
						name='bio'
						value={bio}
						onChange={formDataHandler}
					></textarea>
					<small className='form-text'>Tell us a little about yourself</small>
				</div>

				<div className='my-2'>
					<button
						type='button'
						className='btn btn-light'
						onClick={() => setDisplaySocialLinks(!displaySocialLinks)}
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				{displaySocialLinks ? (
					<Fragment>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x'></i>
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={formDataHandler}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x'></i>
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={formDataHandler}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x'></i>
							<input
								type='text'
								placeholder='YouTube URL'
								name='youtube'
								value={youtube}
								onChange={formDataHandler}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x'></i>
							<input
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								value={linkedin}
								onChange={formDataHandler}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x'></i>
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={formDataHandler}
							/>
						</div>
					</Fragment>
				) : null}
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</section>
	);
};

export default CreateProfile;
