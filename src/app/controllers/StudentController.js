import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      feet_tall: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      age: Yup.number(),
      weight: Yup.number(),
      feet_tall: Yup.number(),
    });

    if (!(await schema.isValid({ ...req.body, id })))
      return res.status(400).json({ error: 'Validation fails' });

    const student = await Student.findByPk(id);
    if (!student) return res.status(400).json({ error: 'Student not found' });

    await student.update(req.body);

    return res.json(student);
  }
}

export default new StudentController();
