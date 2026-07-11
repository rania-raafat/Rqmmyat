import Service from "../models/Service.js";
import Project from "../models/Project.js";
import Client from "../models/Client.js";
import Contact from "../models/Contact.js";
import Team from "../models/Team.js";

export const getStats = async (req, res) => {

  try {

    const services = await Service.countDocuments();

    const projects = await Project.countDocuments();

    const clients = await Client.countDocuments();

    const contacts = await Contact.countDocuments();

    const team = await Team.countDocuments();

    res.json({
      services,
      projects,
      clients,
      contacts,
      team
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};