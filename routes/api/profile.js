const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//* @route   GET api/profile/me
//* @desc    Get Current User profile
//* @access  Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//* @route   POST api/profile
//* @desc    Create or update a User profile
//* @access  Private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		// Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) {
			profileFields.company = company;
		}
		if (website) {
			profileFields.website = website;
		}
		if (location) {
			profileFields.location = location;
		}
		if (bio) {
			profileFields.bio = bio;
		}
		if (status) {
			profileFields.status = status;
		}
		if (githubusername) {
			profileFields.githubusername = githubusername;
		}
		if (skills) {
			profileFields.skills = skills.split(',').map(skill => skill.trim());
		}

		// Build Social object
		profileFields.social = {};
		if (youtube) {
			profileFields.social.youtube = youtube;
		}
		if (facebook) {
			profileFields.social.facebook = facebook;
		}
		if (linkedin) {
			profileFields.social.linkedin = linkedin;
		}
		if (instagram) {
			profileFields.social.instagram = instagram;
		}
		if (twitter) {
			profileFields.social.twitter = twitter;
		}

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				// Update Profile
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);

				return res.json(profile);
			}

			// Create Profile
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//* @route   GET api/profile
//* @desc    Get all profiles
//* @access  Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);

		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//* @route   GET api/profile/user/:user_id
//* @desc    Get single profile by user ID
//* @access  Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);

		if ((err.kind = 'ObjectId')) {
			return res.status(400).json({ msg: 'Profile not found' });
		}

		res.status(500).send('Server Error');
	}
});

//* @route   DELETE api/profile
//* @desc    Delete profile, user & posts
//* @access  Private
router.delete('/', auth, async (req, res) => {
	try {
		// todo - Remove user posts

		// Remove Profile
		await Profile.findOneAndRemove({ user: req.user.id });

		// Remove User
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//* @route   PUT api/profile/experience
//* @desc    Add Profile experience
//* @access  Private
// todo - Add PUT functionality to edit experience
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('company', 'company is required').not().isEmpty(),
			check('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, company, location, from, to, current } = req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.experience.unshift(newExp);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
	}
);

//* @route   DELETE api/profile/experience/:exp_id
//* @desc    Delete experience from profile
//* @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		// Get the remove index
		const removeIndex = profile.experience
			.map(item => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//* @route   PUT api/profile/experience/:exp_id
//* @desc    Update experience from profile
//* @access  Private
router.put(
	'/experience/:exp_id',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('company', 'company is required').not().isEmpty(),
			check('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, company, location, from, to, current } = req.body;

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			const updIndex = profile.experience
				.map(item => item.id)
				.indexOf(req.params.exp_id);

			if (profile) {
				// Update experience
				profile.experience[updIndex] = {
					title,
					company,
					location,
					from,
					to,
					current,
				};
				await profile.save();
				return res.json(profile);
			}
		} catch (err) {
			console.error(err.message);

			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;