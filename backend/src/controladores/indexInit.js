const indexCtrl = {};

//renderizar la plantilla index
indexCtrl.GetIndex = (req,res)=>{
    res.render('index');
};
//renderizar la plantilla about
indexCtrl.GetAbout = (req,res)=>{
    res.render('about');
}

module.exports = indexCtrl;