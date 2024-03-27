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
      listItems: {
        Row: {
          hidden: boolean;
          id: number;
          id_list: number;
          link: string | null;
          price: string | null;
          text: string | null;
          title: string;
        };
        Insert: {
          hidden?: boolean;
          id?: number;
          id_list: number;
          link?: string | null;
          price?: string | null;
          text?: string | null;
          title: string;
        };
        Update: {
          hidden?: boolean;
          id?: number;
          id_list?: number;
          link?: string | null;
          price?: string | null;
          text?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_listItems_id_list_fkey";
            columns: ["id_list"];
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
          name: string;
          user_uuid: string;
        };
        Insert: {
          date_of_creation?: string;
          description?: string | null;
          hidden?: boolean;
          id?: number;
          name: string;
          user_uuid?: string;
        };
        Update: {
          date_of_creation?: string;
          description?: string | null;
          hidden?: boolean;
          id?: number;
          name?: string;
          user_uuid?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: number;
          name: string;
          phone: number | null;
          user_uuid: string;
        };
        Insert: {
          id?: number;
          name: string;
          phone?: number | null;
          user_uuid: string;
        };
        Update: {
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
          description: string | null;
          hidden: boolean;
          id: number;
          id_list: number;
          link: string | null;
          price: number | null;
          title: string;
        };
        Insert: {
          description?: string | null;
          hidden?: boolean;
          id?: number;
          id_list: number;
          link?: string | null;
          price?: number | null;
          title: string;
        };
        Update: {
          description?: string | null;
          hidden?: boolean;
          id?: number;
          id_list?: number;
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
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
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
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
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
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
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
