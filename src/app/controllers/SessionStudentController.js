import * as Yup from 'yup';
import Student from '../models/Student';
import File from '../models/File';

class SessionStudentController {
  async store(req, res) {
    const { id } = req.body;

    const student = await Student.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!student) return res.status(401).json({ error: 'Student not found' });

    return res.json(student);
  }
}

export default new SessionStudentController();
