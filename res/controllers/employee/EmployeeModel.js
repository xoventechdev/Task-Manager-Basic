import { UserModel } from "../../models/user/UserModel.js";

// ** Create Employee **
export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, mobile, photo, note, projects, userID } =
      req.body;

    // Check if user with the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user with the employee data
    const user = new User({ email, password });
    await user.save();

    const employee = new Employee({
      name,
      email,
      mobile,
      photo,
      note,
      projects,
      userID: user._id,
      status: "active", // Default status
    });

    await employee.save();

    res.status(201).json({ message: "Employee created successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

// ** Get All Employees **
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("userID", "email name"); // Populate user details
    res.status(200).json(employees);
  } catch (err) {
    handleError(err, res);
  }
};

// ** Get Single Employee **
export const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id).populate(
      "userID",
      "email name"
    ); // Populate user details
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    handleError(err, res);
  }
};

// ** Update Employee **
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const allowedUpdates = [
    "name",
    "email",
    "mobile",
    "photo",
    "note",
    "projects",
  ];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).json({ message: "Invalid update fields" });
  }

  try {
    const employee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

// ** Delete Employee ** (Soft delete recommended)
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true }
    ); // Soft delete
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (err, res) => {
  console.error(err);
  res.status(500).json({ status: "error", response: err.message });
};
