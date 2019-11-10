import Plan from '../models/Plan';
import { Op } from 'sequelize';

class PlanController {
  async index(req, res) {
    const title = req.query.title || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    // const plans = await Plan.findAll();
    // return res.json(plans);

    // const count = await Plan.count({
    //   order: ['title'],
    //   where: {
    //     title: {
    //       [Op.iLike]: `%${title}%`,
    //     },
    //   },
    // });

    // const plans = await Plan.findAll({
    //   order: ['title'],
    //   where: {
    //     title: {
    //       [Op.iLike]: `%${title}%`,
    //     },
    //   },
    //   limit: perPage,
    //   offset: (page - 1) * perPage,
    // });

    const plans = await Plan.findAndCountAll({
      order: ['title'],
      where: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const totalPage = Math.ceil(plans.count / perPage);

    return res.json({
      page,
      perPage,
      data: plans.rows,
      total: plans.count,
      totalPage,
    });
  }

  async show(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);

    if (!plan) return res.status(404).json({ error: 'Plan Not Found' });

    return res.json(plan);
  }

  async store(req, res) {
    const plan = await Plan.create(req.body);
    return res.status(201).json(plan);
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) return res.status(400).json({ error: 'Plan not found' });

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) return res.status(400).json({ error: 'Plan not found' });

    await plan.destroy();
    return res.json({ message: 'Plan successfully removed' });
  }
}

export default new PlanController();
