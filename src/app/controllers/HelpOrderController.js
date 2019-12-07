import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const studentExists = await Student.findByPk(req.params.id);

    if (!studentExists)
      return res.status(400).json({ error: 'Student not found' });

    const helporders = await HelpOrder.findAndCountAll({
      order: [['created_at', 'DESC']],
      where: { student_id: req.params.id },
      limit: perPage,
      offset: (page - 1) * perPage,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    const totalPage = Math.ceil(helporders.count / perPage);

    return res.json({
      page,
      perPage,
      data: helporders.rows,
      total: helporders.count,
      totalPage,
    });
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
