import Role from "../models/Role.js";

export const getAllRole = async (req, res) => {
  try {
    const allrole = await Role.find();
    if (typeof allrole !== "undefined" && allrole.length === 0)
      return res.status(400).json({ msg: `Can't find any data !` });
    return res.status(200).json({ allrole });
  } catch (error) {}
};
export const getoneRole = async (req, res) => {
  try {
  } catch (error) {}
};
export const createRole = async (req, res) => {
  try {
  } catch (error) {}
};
export const updateRole = async (req, res) => {
  try {
  } catch (error) {}
};
export const deleteRole = async (req, res) => {
  try {
  } catch (error) {}
};
