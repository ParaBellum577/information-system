import { Stakeholder } from "../dataAccess/stakeholder.data"
import { User } from "../dataAccess/user.data"


export class StakeholderService {

  constructor() {
    this.Stakeholder = new Stakeholder()
    this.User = new User()
  }

  async stakeholderCreate(stakeholder) {
    console.log(stakeholder.data.dateFrom)
    console.log(typeof stakeholder.data.dateFrom)

    stakeholder.data.dateFrom = new Date(stakeholder.data.dateFrom.split('-').map(item => +item < 10 ? '0'+item : item).join('-'))
    stakeholder.data.dateTo = new Date(stakeholder.data.dateTo.split('-').map(item => +item < 10 ? '0'+item : item).join('-'))

    const stakeholderRes = await this.Stakeholder.stakeholderSave(stakeholder.data, stakeholder.contact)  
    const equipmentToSave = await Promise.all(stakeholder.equipment.map(item => {

      return {
        stakeholderQueryId: stakeholderRes.id,
        equipmentId: item,
      }
    }))

    const equipmentRes = await this.Stakeholder.stakeholderEquipmentSave(equipmentToSave)

    const productsToSave = await Promise.all(stakeholder.products.map(item => {
        return {
          stakeholderQueryId: stakeholderRes.id,
          productName: item,
        }
      }),
    )

    const productsRes = await this.Stakeholder.stakeholderProductSave(productsToSave)


    const positiveInterestsToSave = await Promise.all(stakeholder.positiveStakeholders.map(item => {
        return {
          stakeholderQueryId: stakeholderRes.id,
          interestName: item,
          isPositive: true,
        }
      }),
    )


    const negativeInterestsToSave = await Promise.all(stakeholder.negativeStakeholders.map(item => {
        return {
          stakeholderQueryId: stakeholderRes.id,
          interestName: item,
          isPositive: false,
        }
      }),
    )

    const interestToSave = [...positiveInterestsToSave, ...negativeInterestsToSave]

    const interestRes = await this.Stakeholder.stakeholderInterestSave(interestToSave)

    const targetGroupsToSave = await Promise.all(stakeholder.targetGroups.map(item => {
        return {
          stakeholderQueryId: stakeholderRes.id,
          targetGroupName: item,
        }
      }),
    )
    const targetGroupsRes = await this.Stakeholder.stakeholderTargetGroupSave(targetGroupsToSave)

    //   return stakeholderRes

    return await this.findStakeholderOne({ id: stakeholderRes.id })

  }


  async queryConfirm(stakeholderQueryId, userId) {
    const stakeholderQuery = await this.findStakeholderOne({ id: stakeholderQueryId })
    const status = await this.findStatus("accepted")
    stakeholderQuery.stakeholderQueryStatusId = status.id
    //    await stakeholderQuery.save()
    await this.Stakeholder.stakeholderQuerySave(stakeholderQuery)

    const project = await this.Stakeholder.addProject(stakeholderQueryId, userId)
    const team = await this.Stakeholder.createTeam(project.id, userId)
    const teamUser = await this.Stakeholder.addUser(team.id,userId)

    return stakeholderQuery

  }

  async queryDecline(stakeholderQueryId, reason) {
    const stakeholderQuery = await this.findStakeholderOne({ id: stakeholderQueryId })

    const status = await this.findStatus("rejected")
    console.log(status)
    stakeholderQuery.stakeholderQueryStatusId = status.id
    //    await stakeholderQuery.save()
    await this.Stakeholder.stakeholderQuerySave(stakeholderQuery)

    await this.Stakeholder.createReason(stakeholderQueryId, reason)
    return stakeholderQuery

  }

  async querySpam(stakeholderQueryId) {


    const stakeholderQuery = await this.findStakeholderOne({ id: stakeholderQueryId })

  const user =  await this.User.findUserByCondition({id: stakeholderQuery.userId})
    user.isActive = false
    await this.User.userUpdateSave(user)
    const res = stakeholderQuery.destroy()

    return res

  }

  async changeUserRole(userId, roleId) {
    const user = await this.User.findUserByConditionWithoutPass({id: userId})
    user.roleId = roleId

    return await this.User.userUpdateSave(user)

  }

  async userConfirm(userId) {
    const user = await this.User.findUserByConditionWithoutPass({ id: userId })
    const role = await this.User.findRoleByName("user")
    user.roleId = role.id
    user.userConfirm = true
    user.reload()
    //    await stakeholderQuery.save()
    await this.User.userUpdateSave(user)


    return user

  }

  async userDecline(userId) {
    const user = await this.User.findUserByConditionWithoutPass({ id: userId })
    user.isActive = false

    //    await stakeholderQuery.save()
    await this.User.userUpdateSave(user)

    return user

  }

  async findStakeholderOne(condition) {
    return await this.Stakeholder.findStakeholderOneByCondition(condition)
  }

  async showStakeholderQueryAll() {
    //const status = await this.Stakeholder.findStatus("onCheck")
    return await this.Stakeholder.findStakeholderAllByCondition()
  }

  async showAcceptedStakeholderQueryAll() {
    const status = await this.Stakeholder.findStatus("accepted")
    return await this.Stakeholder.findStakeholderAllByCondition({ stakeholderQueryStatusId: status.id })
  }

  async findStakeholderQueryAll() {
    return await this.Stakeholder.findStakeholderQueryAll()
  }

  async findStatus(statusName) {
    return await this.Stakeholder.findStatus(statusName)
  }
}