import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const name = req.query.name || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const students = await Student.findAndCountAll({
      order: ['name'],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const totalPage = Math.ceil(students.count / perPage);

    return res.json({
      page,
      perPage,
      data: students.rows,
      total: students.count,
      totalPage,
    });
  }

  async show(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) return res.status(404).json({ error: 'Student Not Found' });

    return res.json(student);
  }

  async store(req, res) {
    const student = await Student.create(req.body);

    return res.status(201).json(student);
  }

  async update(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) return res.status(400).json({ error: 'Student not found' });

    await student.update(req.body);

    return res.json(student);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) return res.status(404).json({ error: 'Student Not Found' });

    await student.destroy();
    return res.json({
      message: 'Student removed',
    });
  }
}

export default new StudentController();
