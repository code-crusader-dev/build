import { supabase } from './supabase';
import { Club } from '@/types/club';
import { Event } from '@/types/event';
import { UserProfile } from '@/types/user';

/**
 * Database result type
 */
export interface DatabaseResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// ==================== CLUBS ====================

/**
 * Fetch all clubs from database
 * @returns Array of clubs or error
 */
export const fetchClubs = async (): Promise<DatabaseResult<Club[]>> => {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch clubs error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch clubs',
      };
    }

    return {
      success: true,
      data: data || [],
    };
  } catch (error: any) {
    console.error('Fetch clubs error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

/**
 * Fetch a single club by ID
 * @param clubId - Club ID
 * @returns Club data or error
 */
export const fetchClubById = async (clubId: string): Promise<DatabaseResult<Club>> => {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .eq('id', clubId)
      .single();

    if (error) {
      console.error('Fetch club error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch club',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error('Fetch club error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

// ==================== EVENTS ====================

/**
 * Fetch all events from database
 * @returns Array of events or error
 */
export const fetchEvents = async (): Promise<DatabaseResult<Event[]>> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Fetch events error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch events',
      };
    }

    return {
      success: true,
      data: data || [],
    };
  } catch (error: any) {
    console.error('Fetch events error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

/**
 * Fetch events by club ID
 * @param clubId - Club ID
 * @returns Array of events or error
 */
export const fetchEventsByClub = async (clubId: string): Promise<DatabaseResult<Event[]>> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('club_id', clubId)
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Fetch events error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch events',
      };
    }

    return {
      success: true,
      data: data || [],
    };
  } catch (error: any) {
    console.error('Fetch events error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

/**
 * Fetch a single event by ID
 * @param eventId - Event ID
 * @returns Event data or error
 */
export const fetchEventById = async (eventId: string): Promise<DatabaseResult<Event>> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (error) {
      console.error('Fetch event error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch event',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error('Fetch event error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

// ==================== REGISTRATIONS ====================

/**
 * Insert event registration
 * @param userId - User ID
 * @param eventId - Event ID
 * @returns Success status or error
 */
export const insertRegistration = async (
  userId: string,
  eventId: string
): Promise<DatabaseResult> => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .insert({
        user_id: userId,
        event_id: eventId,
        registered_at: new Date().toISOString(),
        status: 'confirmed',
      })
      .select()
      .single();

    if (error) {
      console.error('Insert registration error:', error);
      return {
        success: false,
        error: error.message || 'Failed to register for event',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error('Insert registration error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

/**
 * Fetch user registrations
 * @param userId - User ID
 * @returns Array of registrations or error
 */
export const fetchUserRegistrations = async (userId: string): Promise<DatabaseResult> => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*, events(*)')
      .eq('user_id', userId)
      .order('registered_at', { ascending: false });

    if (error) {
      console.error('Fetch registrations error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch registrations',
      };
    }

    return {
      success: true,
      data: data || [],
    };
  } catch (error: any) {
    console.error('Fetch registrations error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

// ==================== USER PROFILES ====================

/**
 * Insert or update user profile
 * @param profile - User profile data
 * @returns Success status or error
 */
export const insertUserProfile = async (profile: Partial<UserProfile>): Promise<DatabaseResult> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert(profile, { onConflict: 'uid' })
      .select()
      .single();

    if (error) {
      console.error('Insert user profile error:', error);
      return {
        success: false,
        error: error.message || 'Failed to save user profile',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error('Insert user profile error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

/**
 * Fetch user profile by ID
 * @param userId - User ID
 * @returns User profile or error
 */
export const fetchUserProfile = async (userId: string): Promise<DatabaseResult<UserProfile>> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('uid', userId)
      .single();

    if (error) {
      console.error('Fetch user profile error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch user profile',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error('Fetch user profile error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};
