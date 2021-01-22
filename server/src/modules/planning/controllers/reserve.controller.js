




export const createEquipmentReserve = async (req, res) => {
  try {
    const userId = req.userId
    // const accessToken = req.accessToken
    const { equipmentId, projectId, dateFrom,  } = req.body

    const acceptedQuery = await Stakeholder.queryConfirm(stakeholderQueryId, userId)


    res.status(200).json( acceptedQuery )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}