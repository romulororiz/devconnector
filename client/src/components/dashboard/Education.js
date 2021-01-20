import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education }) => {
	const dispatch = useDispatch();

	const educations = education.map(edu => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className='hide-sm'>{edu.degree}</td>
			<td className='hide-sm'>{edu.fieldofstudy}</td>
			<td>
				<Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
				{edu.to === null ? (
					'Now'
				) : (
					<Moment format='DD/MM/YYYY'>{edu.to}</Moment>
				)}
			</td>
			<td>
				<button
					className='btn btn-danger'
					onClick={() => dispatch(deleteEducation(edu._id))}
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 className='my-2'>Education Credentials</h2>
			{!education.length ? (
				<h4>You still haven't added any education</h4>

			) : (
				<table className='table'>
					<thead>
						<tr>
							<th>School</th>
							<th className='hide-sm'>Degree</th>
							<th className='hide-sm'>Field of Study</th>
							<th className='hide-sm'>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{educations}</tbody>
				</table>
			)}
		</Fragment>
	);
};

export default Education;
