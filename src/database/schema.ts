export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      frends: {
        Row: {
          id: number;
          owner_id: string;
          user_id: number;
        };
        Insert: {
          id?: number;
          owner_id?: string;
          user_id: number;
        };
        Update: {
          id?: number;
          owner_id?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_frends_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      liked: {
        Row: {
          id: number;
          list_id: number;
          owner_id: string;
        };
        Insert: {
          id?: number;
          list_id: number;
          owner_id?: string;
        };
        Update: {
          id?: number;
          list_id?: number;
          owner_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_liked_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["id"];
          }
        ];
      };
      lists: {
        Row: {
          date_of_creation: string;
          description: string | null;
          hidden: boolean;
          id: number;
          image_url: string | null;
          name: string;
          user_id: number;
          user_uuid: string;
        };
        Insert: {
          date_of_creation?: string;
          description?: string | null;
          hidden?: boolean;
          id?: number;
          image_url?: string | null;
          name: string;
          user_id: number;
          user_uuid?: string;
        };
        Update: {
          date_of_creation?: string;
          description?: string | null;
          hidden?: boolean;
          id?: number;
          image_url?: string | null;
          name?: string;
          user_id?: number;
          user_uuid?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          email: string;
          id: number;
          name: string;
          phone: number | null;
          user_uuid: string;
        };
        Insert: {
          email: string;
          id?: number;
          name: string;
          phone?: number | null;
          user_uuid: string;
        };
        Update: {
          email?: string;
          id?: number;
          name?: string;
          phone?: number | null;
          user_uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_users_user_uuid_fkey";
            columns: ["user_uuid"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      wishs: {
        Row: {
          category_id: number;
          date_of_creation: string;
          description: string | null;
          fulfilled: boolean | null;
          hidden: boolean;
          id: number;
          id_list: number;
          image_url: string | null;
          link: string | null;
          price: number | null;
          title: string;
        };
        Insert: {
          category_id: number;
          date_of_creation?: string;
          description?: string | null;
          fulfilled?: boolean | null;
          hidden?: boolean;
          id?: number;
          id_list: number;
          image_url?: string | null;
          link?: string | null;
          price?: number | null;
          title: string;
        };
        Update: {
          category_id?: number;
          date_of_creation?: string;
          description?: string | null;
          fulfilled?: boolean | null;
          hidden?: boolean;
          id?: number;
          id_list?: number;
          image_url?: string | null;
          link?: string | null;
          price?: number | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_wish_id_list_fkey";
            columns: ["id_list"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
