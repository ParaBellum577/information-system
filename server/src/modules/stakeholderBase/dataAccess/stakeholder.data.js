import db from "../../../db/models"

export class Stakeholder {


  constructor() {
    this.app = db.app
    this.stakeholders = db.stakeholders
  }

  async stakeholderSave(stakeholderQuery, stakeholderQueryContact) {
    return await this.app.StakeholderQuery.create({
      ...stakeholderQuery,
      StakeholderContact: {
        ...stakeholderQueryContact,
      },

    }, {
      include: db.app.StakeholderContact,
    })
  }


  async stakeholderEquipmentSave(equipmentToSave) {
    return await this.app.StakeholderEquipment.bulkCreate(equipmentToSave)
  }


  async stakeholderProductSave(productsToSave) {
    return await this.app.Product.bulkCreate(productsToSave)
  }


  async stakeholderTargetGroupSave(targetGroupsToSave) {
    return await this.app.TargetGroup.bulkCreate(targetGroupsToSave)
  }


  async stakeholderInterestSave(interestToSave) {
    return await this.app.StakeholderInterest.bulkCreate(interestToSave)
  }


  async findStatus(statusName) {
    return await this.app.StakeholderQueryStatus.findOne({ where: { statusName } })
  }


  async stakeholderQuerySave(stakeholderQuery) {
    return await stakeholderQuery.save()
  }
  
  async createReason (stakeholderQueryId, reason ) {
    return await this.app.QueryDeclineReason.create({
      stakeholderQueryId,
      reason
    })
  }

  async addProject(stakeholderId, creator) {

    return await this.app.Project.create({
      stakeholderId,
      creator,
    })
  }

  async createTeam(projectId, creator) {

    return await this.app.Team.create({
        creator,
        projectId,

      },
    )
  }

  async addUser(teamId, userId) {

    return await this.app.TeamUser.create({
      teamId,
      userId,
    })
  }


  async findStakeholderAllByCondition(condition) {
    return await this.app.StakeholderQuery.findAll({
      where: condition,
      include: [
        {
          model: this.app.Product,
          attributes: ["id", "productName"],
        },
        {
          model: this.app.StakeholderEquipment,
          attributes: ["equipmentId"],
          include: [{
            model: this.app.Equipment,
            attributes: ["equipmentName"],
          }],
        },
        {
          model: this.app.StakeholderInterest,
          attributes: ["id", "interestName", "isPositive"],
        },
        {
          model: this.app.TargetGroup,
          attributes: ["id", "targetGroupName"],
        },
        {
          model: this.app.StakeholderContact,
        },
        {
          model: this.app.StakeholderQueryStatus,
        },
        {
          model: this.app.QueryDeclineReason,
        },
      ],
    })
  }

  async findStakeholderQueryAll() {
    return await this.app.StakeholderQuery.findAll({
      include: [
        {
          model: this.app.Product,
          attributes: ["id", "productName"],
        },
        {
          model: this.app.StakeholderEquipment,
          attributes: ["id", "equipmentId"],
          // include: [{
          //   model: db.Equipment,
          //   attributes: ["equipmentName"],
          // }],
        },
        {
          model: this.app.StakeholderInterest,
          attributes: ["id", "interestName", "isPositive"],
        },
        {
          model: this.app.TargetGroup,
          attributes: ["id", "targetGroupName"],
        },
        {
          model: this.app.StakeholderContact,
        },
        {
          model: this.app.StakeholderQueryStatus,
        },
      ],
    })
  }

  async findStakeholderOneByCondition(condition) {
    return await this.app.StakeholderQuery.findOne({
      where: condition,
      include: [
        {
          model: this.app.Product,
          attributes: ["id", "productName"],
        },
        {
          model: this.app.StakeholderEquipment,
          attributes: ["id", "equipmentId"],
          // include: [{
          //   model: db.Equipment,
          //   attributes: ["equipmentName"],
          // }],
        },
        {
          model: this.app.StakeholderInterest,
          attributes: ["id", "interestName", "isPositive"],
        },
        {
          model: this.app.TargetGroup,
          attributes: ["id", "targetGroupName"],
        },
        {
          model: this.app.StakeholderContact,
        },
        {
          model: this.app.StakeholderQueryStatus,
        },
        {
          model: this.app.QueryDeclineReason,
        },
      ],
    })
  }
}