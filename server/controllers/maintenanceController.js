// hah om sai ram om bhaskarayaa namaha om namaha sivayaa




import Maintenance from '../models/Maintenance.js';
import Page from '../models/Page.js';
import Component from '../models/Component.js';

/**
 * Create a new maintenance event and associate it with a page and components.
 */
export const createMaintenance = async (req, res) => {
  try {
    const { pageId } = req.params;
    const {
      title,
      description,
      status,
      scheduledStart,
      scheduledEnd,
      affectedComponents = [],
    } = req.body;

    const page = await Page.findById(pageId);
    if (!page) return res.status(404).json({ error: 'Page not found' });

    const maintenance = await Maintenance.create({
      page: pageId,
      title,
      description,
      status,
      scheduledStart,
      scheduledEnd,
      affectedComponents,
    });

    // Add maintenance to the page
    page.maintenance.push(maintenance._id);
    await page.save();

    // Update components with this maintenance
    await Component.updateMany(
      { _id: { $in: affectedComponents } },
      { $addToSet: { maintenance: maintenance._id } }
    );

    res.status(201).json(maintenance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all maintenance events for a page.
 */
export const getAllMaintenances = async (req, res) => {
  try {
    const { pageId } = req.params;
    const maintenances = await Maintenance.find({ page: pageId })
      .populate('affectedComponents', 'name status')
      .sort({ createdAt: -1 });

    res.status(200).json(maintenances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get a single maintenance event by its ID.
 */
export const getMaintenanceById = async (req, res) => {
  try {
    const { maintenanceId } = req.params;
    const maintenance = await Maintenance.findById(maintenanceId)
      .populate('affectedComponents', 'name status');

    if (!maintenance) return res.status(404).json({ error: 'Maintenance not found' });

    res.status(200).json(maintenance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update a maintenance event.
 */
export const updateMaintenance = async (req, res) => {
  try {
    const { maintenanceId } = req.params;
    const {
      title,
      description,
      status,
      scheduledStart,
      scheduledEnd,
      affectedComponents,
    } = req.body;

    const maintenance = await Maintenance.findById(maintenanceId);
    if (!maintenance) return res.status(404).json({ error: 'Maintenance not found' });

    // If affected components are updated, remove old links
    if (affectedComponents && affectedComponents.length > 0) {
      await Component.updateMany(
        { _id: { $in: maintenance.affectedComponents } },
        { $pull: { maintenance: maintenance._id } }
      );

      await Component.updateMany(
        { _id: { $in: affectedComponents } },
        { $addToSet: { maintenance: maintenance._id } }
      );

      maintenance.affectedComponents = affectedComponents;
    }

    maintenance.title = title || maintenance.title;
    maintenance.description = description || maintenance.description;
    maintenance.status = status || maintenance.status;
    maintenance.scheduledStart = scheduledStart || maintenance.scheduledStart;
    maintenance.scheduledEnd = scheduledEnd || maintenance.scheduledEnd;

    await maintenance.save();
    res.status(200).json(maintenance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a maintenance event.
 */
export const deleteMaintenance = async (req, res) => {
  try {
    const { maintenanceId } = req.params;

    const maintenance = await Maintenance.findById(maintenanceId);
    if (!maintenance) return res.status(404).json({ error: 'Maintenance not found' });

    // Remove from associated components
    await Component.updateMany(
      { _id: { $in: maintenance.affectedComponents } },
      { $pull: { maintenance: maintenance._id } }
    );

    // Remove from page
    await Page.findByIdAndUpdate(maintenance.page, {
      $pull: { maintenance: maintenance._id },
    });

    await maintenance.remove();

    res.status(200).json({ message: 'Maintenance deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// import Maintenance from '../models/Maintenance.js'
// import Page from '../models/Page.js'
// import Component from '../models/Component.js'

// // Create Maintenance
// export const createMaintenance = async (req, res) => {
//   try {
//     const { title, description, scheduledStart, scheduledEnd, status, componentIds, pageId } = req.body

//     if (!componentIds || componentIds.length === 0) {
//       return res.status(400).json({ message: 'At least one component is required' })
//     }

//     const maintenance = await Maintenance.create({
//       title,
//       description,
//       scheduledStart,
//       scheduledEnd,
//       status,
//       component: componentIds
//     })

//     await Page.findByIdAndUpdate(pageId, { $push: { maintenance: maintenance._id } })

//     await Component.updateMany(
//       { _id: { $in: componentIds } },
//       { $push: { maintenance: maintenance._id } }
//     )

//     res.status(201).json(maintenance)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: 'Failed to create maintenance' })
//   }
// }

// // Get all maintenance events for a page
// export const getMaintenanceByPage = async (req, res) => {
//   try {
//     const { pageId } = req.params
//     const page = await Page.findById(pageId).populate({
//       path: 'maintenance',
//       populate: { path: 'component', select: 'name status' }
//     })

//     if (!page) return res.status(404).json({ message: 'Page not found' })

//     res.status(200).json(page.maintenance)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: 'Failed to get maintenance' })
//   }
// }

// // Update Maintenance
// export const updateMaintenance = async (req, res) => {
//   try {
//     const { maintenanceId } = req.params
//     const updated = await Maintenance.findByIdAndUpdate(maintenanceId, req.body, { new: true })

//     if (!updated) return res.status(404).json({ message: 'Maintenance not found' })

//     res.json(updated)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: 'Failed to update maintenance' })
//   }
// }

// // Delete Maintenance
// export const deleteMaintenance = async (req, res) => {
//   try {
//     const { maintenanceId, pageId } = req.params

//     const maintenance = await Maintenance.findById(maintenanceId)
//     if (!maintenance) return res.status(404).json({ message: 'Maintenance not found' })

//     await Page.findByIdAndUpdate(pageId, { $pull: { maintenance: maintenanceId } })

//     await Component.updateMany(
//       { _id: { $in: maintenance.component } },
//       { $pull: { maintenance: maintenanceId } }
//     )

//     await Maintenance.findByIdAndDelete(maintenanceId)

//     res.json({ message: 'Maintenance deleted successfully' })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: 'Failed to delete maintenance' })
//   }
// }




