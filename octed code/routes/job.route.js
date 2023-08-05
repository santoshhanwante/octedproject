// install required dependencies
const express = require('express');
const { JobModel } = require('../models/job.model');
const data = require('../assets/data.json');


// create a job route for building crud app
const jobRoute = express.Router();


// ---------------- GET DATA OF JOB ROUTE ---------------- //
jobRoute.get('/', async (request, response) => {
    const query = request.query;

    try {
        const job_data = await JobModel.find(query);
        response.send(job_data);
    } catch (error) {
        response.send({
            'message': 'something went wrong',
            'error': error
        });
    }
});


// ---------------- POST DATA OF JOB ROUTE ---------------- //
jobRoute.post('/addjobs', async (request, response) => {
    const { name, location, posted, status, applied, jobViews, daysLeft, premium, dateFormat } = request.body;
    // console.log('data: ',data);

    try {
        {
            const add_data = new JobModel({
                name,
                location,
                posted,
                status,
                applied,
                jobViews,
                daysLeft,
                premium,
                dateFormat
            });
            await add_data.save();
            response.json(add_data);
        } {
            response.send({
                'message': 'All fields are required'
            })
        }
    } catch (error) {
        response.send({
            'message': 'something went wrong',
            'error': error
        });
    }
});


// export it to use everywhere in our local file
module.exports = { jobRoute };