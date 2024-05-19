const models = require("../models");
const path = require('path');

exports.actualizar_progreso = async (req, res) => {
    try {
        const { userId, markerId } = req.body;

        // Crear un nuevo progreso
        await models.progresoUsuariomMarcadores.create({
            userId: userId,
            markerId: markerId
        });

        // Contar el progreso total del usuario
        const cantidadProgreso = await models.progresoUsuariomMarcadores.count({
            where: { userId: userId }
        });

        // Buscar recompensas que coincidan con la cantidad de progreso
        const recompensas = await models.recompensas.findAll({
            where: { cantidad_experiencias: cantidadProgreso }
        });

        if (recompensas && recompensas.length > 0) {
            let nuevasRecompensas = [];
            for (const recompensa of recompensas) {
                const recompensaUsuario = await models.recompensaUsuarios.findOne({
                    where: {
                        userId: userId,
                        recompensaId: recompensa.id
                    }
                });

                // Si la recompensa no ha sido reclamada, crear el registro
                if (!recompensaUsuario) {
                    await models.recompensaUsuarios.create({
                        userId: userId,
                        recompensaId: recompensa.id
                    });
                    nuevasRecompensas.push(recompensa);
                }
            }

            // Responder con la cantidad de nuevas recompensas obtenidas
            if (nuevasRecompensas.length > 0) {
                const alertaHTML = crearAlertaHTML('Nuevas recompensas obtenidas');
                return res.status(200).send({
                    message: 'Nuevas recompensas obtenidas',
                    nuevasRecompensas: nuevasRecompensas.length,
                    progreso: cantidadProgreso,
                    alertaHTML: alertaHTML
                });
            } else {
                return res.status(200).send({ message: 'Recompensas ya obtenidas' });
            }
        } else {
            // Calcular la cantidad de marcadores faltantes para la próxima recompensa
            const proximaRecompensa = await models.recompensas.findOne({
                where: { cantidad_experiencias: { [models.Sequelize.Op.gt]: cantidadProgreso } },
                order: [['cantidad_experiencias', 'ASC']]
            });

            if (proximaRecompensa) {
                const faltantes = proximaRecompensa.cantidad_experiencias - cantidadProgreso;
                return res.status(200).send({
                    message: `Faltan ${faltantes} marcadores para la próxima recompensa`,
                    progreso: cantidadProgreso
                });
            } else {
                return res.status(200).send({ message: 'No hay más recompensas disponibles' });
            }
        }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

function crearAlertaHTML(message) {
    return `<div class="alert" style="position: fixed; top: 20px; right: 20px; background-color: #4CAF50; color: white; padding: 15px; border-radius: 5px; z-index: 1000;">
                ${message}
                <button onclick="this.parentElement.style.display='none';" style="margin-left: 15px; border: none; background: none; color: white; font-weight: bold;">&times;</button>
            </div>`;
}

exports.get_progreso = async (req, res) => {
    const { userId } = req.params;
    await models.progresoUsuariomMarcadores.findAll({
        where: {
            userId: userId
        }
    }).then(progreso => {
        res.status(200).send(progreso);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

