import userService from "../services/userService";

let listUser = async (req, res) => {
    let data = await userService.listUser();

    return res.render('users/index.ejs', {
        userData: data
    });
}

let createUser = async (req, res) => {
    return res.render('users/create.ejs');
}

let storeUser = async (req, res) => {
    await userService.storeUser(req.body);
    return res.redirect("list-user");
}

let editUser = async (req, res) => {
    try {
        let userId = req.query.id;

        let userData = await userService.editUser(userId);

        return res.render('users/edit.ejs', {
            userData: userData
        });
    } catch (error) {
        console.log(error);

        return res.render("errors/404.ejs");
    }
}

let updateUser = async (req, res) => {
    let data = req.body;
    await userService.updateUser(data);

    return res.redirect("list-user");
}

let deleteUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await userService.deleteUser(userId);
        return res.redirect("list-user");
    } else {
        return res.redirect("list-user");
    }
}

module.exports = {
    listUser: listUser,
    createUser: createUser,
    storeUser: storeUser,
    editUser: editUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}