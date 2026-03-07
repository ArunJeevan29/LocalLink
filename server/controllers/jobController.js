const Job = require("../models/job");

const createJob = async (req, res) => {
  try {
    const { provider, serviceTitle, price } = req.body;

    if (provider === req.user.id) {
      return res.status(400).json({ message: "You cannot hire yourself!" });
    }

    const newJob = await Job.create({
      client: req.user.id,
      provider,
      serviceTitle,
      price,
      status: "Pending",
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.error(`Error in createJob: ${error.message}`);
    res.status(500).json({ message: "Server error creating job request." });
  }
};

const getClientJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ client: req.user.id }).populate(
      "provider",
      "name email",
    );
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching your requests." });
  }
};

const getProviderJobs = async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res
        .status(403)
        .json({ message: "Access denied. Only providers have incoming jobs." });
    }
    const jobs = await Job.find({ provider: req.user.id }).populate(
      "client",
      "name email",
    );
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching incoming jobs." });
  }
};

const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (
      job.provider.toString() !== req.user.id &&
      job.client.toString() !== req.user.id
    ) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this job." });
    }

    job.status = status;
    const updatedJob = await job.save();

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error updating job status." });
  }
};

module.exports = { createJob, getClientJobs, getProviderJobs, updateJobStatus };
