
import { supabase } from './supabase'
import type { User, Reservation, Document, Notification } from './types'

export async function createUser(userData: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single()
    
  if (error) throw error
  return data
}

export async function createReservation(reservationData: Partial<Reservation>) {
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservationData])
    .select()
    .single()
    
  if (error) throw error
  return data
}

export async function uploadDocument(userId: string, file: File, reservationId?: string) {
  const fileName = `${userId}/${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(fileName, file)
    
  if (error) throw error

  const { data: url } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName)

  const doc = {
    user_id: userId,
    reservation_id: reservationId,
    nome: file.name,
    tipo: 'upload',
    url: url.publicUrl
  }

  const { data: document, error: docError } = await supabase
    .from('documents')
    .insert([doc])
    .select()
    .single()
    
  if (docError) throw docError
  return document
}

export async function createNotification(notification: Partial<Notification>) {
  const { data, error } = await supabase
    .from('notifications')
    .insert([notification])
    .select()
    .single()
    
  if (error) throw error
  return data
}

export async function getUserReservations(userId: string) {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, accommodations(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    
  if (error) throw error
  return data
}

export async function getUserDocuments(userId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    
  if (error) throw error
  return data
}

export async function getUserNotifications(userId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    
  if (error) throw error
  return data
}

export async function markNotificationAsRead(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ lida: true })
    .eq('id', notificationId)
    
  if (error) throw error
}

export async function updateReservationStatus(reservationId: string, status: Reservation['status']) {
  const { error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', reservationId)
    
  if (error) throw error
}
