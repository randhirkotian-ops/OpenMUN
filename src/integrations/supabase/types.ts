export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      countries: {
        Row: {
          capital: string
          code: string
          created_at: string
          government_site: string
          mfa_site: string
          name: string
          official_name: string
          un_mission_site: string
          updated_at: string
        }
        Insert: {
          capital?: string
          code: string
          created_at?: string
          government_site?: string
          mfa_site?: string
          name: string
          official_name?: string
          un_mission_site?: string
          updated_at?: string
        }
        Update: {
          capital?: string
          code?: string
          created_at?: string
          government_site?: string
          mfa_site?: string
          name?: string
          official_name?: string
          un_mission_site?: string
          updated_at?: string
        }
        Relationships: []
      }
      country_claims: {
        Row: {
          claim: string
          country_code: string
          created_at: string
          id: string
          published_on: string | null
          publisher: string
          retrieved_on: string | null
          section: string
          source_title: string
          source_type: string
          updated_at: string
          url: string
        }
        Insert: {
          claim: string
          country_code: string
          created_at?: string
          id?: string
          published_on?: string | null
          publisher?: string
          retrieved_on?: string | null
          section: string
          source_title?: string
          source_type?: string
          updated_at?: string
          url?: string
        }
        Update: {
          claim?: string
          country_code?: string
          created_at?: string
          id?: string
          published_on?: string | null
          publisher?: string
          retrieved_on?: string | null
          section?: string
          source_title?: string
          source_type?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "country_claims_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["code"]
          },
        ]
      }
      evidence: {
        Row: {
          claim: string
          created_at: string
          excerpt: string
          id: string
          page: string
          source_id: string | null
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          claim?: string
          created_at?: string
          excerpt?: string
          id?: string
          page?: string
          source_id?: string | null
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          claim?: string
          created_at?: string
          excerpt?: string
          id?: string
          page?: string
          source_id?: string | null
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          body: string
          created_at: string
          folder: string
          id: string
          tags: string[]
          title: string
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          folder?: string
          id?: string
          tags?: string[]
          title?: string
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          body?: string
          created_at?: string
          folder?: string
          id?: string
          tags?: string[]
          title?: string
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      pois: {
        Row: {
          answer: string
          asked_by: string
          created_at: string
          id: string
          response_seconds: number | null
          text: string
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          answer?: string
          asked_by?: string
          created_at?: string
          id?: string
          response_seconds?: number | null
          text?: string
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          answer?: string
          asked_by?: string
          created_at?: string
          id?: string
          response_seconds?: number | null
          text?: string
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pois_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      sources: {
        Row: {
          created_at: string
          id: string
          note: string
          published_on: string | null
          publisher: string
          source_type: string
          title: string
          updated_at: string
          url: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string
          published_on?: string | null
          publisher?: string
          source_type?: string
          title?: string
          updated_at?: string
          url?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string
          published_on?: string | null
          publisher?: string
          source_type?: string
          title?: string
          updated_at?: string
          url?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sources_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          done: boolean
          id: string
          label: string
          position: number
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          done?: boolean
          id?: string
          label: string
          position?: number
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          done?: boolean
          id?: string
          label?: string
          position?: number
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          agenda: string
          committee: string
          conference: string
          country: string
          created_at: string
          delegate: string
          id: string
          position_paper: string
          practice_seconds: number
          resolution: string
          speech_draft: string
          start_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          agenda?: string
          committee?: string
          conference?: string
          country?: string
          created_at?: string
          delegate?: string
          id?: string
          position_paper?: string
          practice_seconds?: number
          resolution?: string
          speech_draft?: string
          start_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          agenda?: string
          committee?: string
          conference?: string
          country?: string
          created_at?: string
          delegate?: string
          id?: string
          position_paper?: string
          practice_seconds?: number
          resolution?: string
          speech_draft?: string
          start_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
