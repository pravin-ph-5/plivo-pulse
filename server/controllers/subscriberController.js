// hah om sai ram om bhaskarayaa namaha om namaha sivayaa

import Subscriber from '../models/Subscriber.js'
import Page from '../models/Page.js'

// Public route — Subscribe to a page
export const subscribeToPage = async (req, res) => {
  try {
    const { email } = req.body
    const { pageId } = req.params

    const page = await Page.findById(pageId)
    if (!page) return res.status(404).json({ message: 'Page not found' })

    const existing = await Subscriber.findOne({ email, page: pageId })
    if (existing) return res.status(400).json({ message: 'Already subscribed' })

    const subscriber = await Subscriber.create({ email, page: pageId })

    page.subscriptions.push(subscriber._id)
    await page.save()

    res.status(201).json({ message: 'Subscribed successfully', subscriber })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to subscribe' })
  }
}

// Admin route — Get all subscribers of a page
export const getSubscribersByPage = async (req, res) => {
  try {
    const { pageId } = req.params

    const page = await Page.findById(pageId).populate('subscriptions')
    if (!page) return res.status(404).json({ message: 'Page not found' })

    res.json(page.subscriptions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch subscribers' })
  }
}

// Admin route — Remove a subscriber
export const deleteSubscriber = async (req, res) => {
  try {
    const { pageId, subscriberId } = req.params

    await Page.findByIdAndUpdate(pageId, {
      $pull: { subscriptions: subscriberId }
    })

    await Subscriber.findByIdAndDelete(subscriberId)

    res.json({ message: 'Subscriber removed successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to delete subscriber' })
  }
}
