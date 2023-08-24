const homePageAPI = async (req, res) => {
    res.status(200).json({ msg: "success" })
}
const homePageAPItesting = async (req, res) => {
    res.status(200).json({ msg: "success testing" })
}

export { homePageAPI, homePageAPItesting }

