import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const studentExists = await Student.findByPk(req.params.id);

    if (!studentExists)
      return res.status(400).json({ error: 'Student not found' });

    const helporders = await HelpOrder.findAll({
      where: { student_id: req.params.id },
    });

    return res.json(helporders);
  }

  async store(req, res) {
    const studentExists = await Student.findByPk(req.params.id);

    if (!studentExists)
      return res.status(400).json({ error: 'Student not found' });

    const helpOrder = await HelpOrder.create({
      ...req.body,
      student_id: req.params.id,
    });

    return res.status(201).json(helpOrder);
  }
}

export default new HelpOrderController();
