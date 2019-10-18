import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
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
