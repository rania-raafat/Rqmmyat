import Team from "../models/Team.js";

export const getTeam = async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamMemberById = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        message: "Team member not found"
      });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const member = await Team.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!member) {
      return res.status(404).json({
        message: "Team member not found"
      });
    }

    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        message: "Team member not found"
      });
    }

    res.json({
      message: "Team member deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};