<template>
  <div class="frame">
    <div class="mask" v-bind:style="dynamicMaskStyle"></div>

    <div class="content" v-bind:style="dynamicStyle">
      <div class="toggleHide" v-if="isOpen" v-on:click="hide"></div>
      <div class="toggleShow" v-else-if="hasChildren" v-on:click="show"></div>

      <button v-on:click="createFrame">ajouter</button>
      <button class="buttonDelete" v-on:click="deleteFrame">X</button>

      <p>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        lobortis velit molestie, lobortis nunc sed, maximus tellus. Proin vel
        diam aliquet nibh venenatis ornare. Vivamus volutpat nisl a mattis
        maximus. 
      </p>
    </div>
  </div>
</template>

<script>
//collections
import { Frames } from "../../imports/collections/frames.js";

export default {
  name: "Frame",

  props: ["frameId", "masks"],

  data() {
    return {
      isOpen: false,
      maskVisibility: "hidden",
    };
  },

  mounted() {
    console.log("mounting");
  },

  watch: {
    masks: {
      deep: true,
      handler() {
        console.log("masks changed");

        if (this.frameData) {
          let tag = this.frameData.tag;
          console.log("zz", tag, this.masks);
          let visibility = this.masks[tag].value;

          if (visibility) {
            this.maskVisibility = "visible";
          } else {
            this.maskVisibility = "hidden";
          }
        }
      },
    },
  },

  computed: {
    dynamicStyle: function () {
      if (!this.frameData) return {};
      else {
        return {
          "border-color":
            "rgb(" +
            this.frameData.color.r +
            "," +
            this.frameData.color.g +
            "," +
            this.frameData.color.b +
            ")",
        };
      }
    },

    hasChildren: function () {
      if (!this.frameData) return false;

      return this.frameData.children.length > 0;
    },

    dynamicMaskStyle: function () {
      if (!this.frameData) return { visibility: "hidden" };
      return {
        visibility: this.maskVisibility,
        "background-color":
          this.frameData.tag == 0
            ? "rgba(255,77,77,0.9)"
            : "rgba(51,153,255,0.9)",
      };
    },
  },

  meteor: {
    //responsive frames collection
    frameData() {
      return Frames.findOne({ _id: this.frameId });
    },
  },

  methods: {
    show: function () {
      this.isOpen = true;

      this.$emit("shown", this.frameId, this.frameData.children);
    },

    hide: function () {
      this.isOpen = false;
      this.$emit("hidden", this.frameData);
    },

    createFrame() {
      Meteor.call(
        "frames.insert",
        this.frameId,
        this.frameData.color,
        (error, result) => {
          this.show();
        }
      );
    },

    deleteFrame() {
      //delete in DB
      Meteor.call("frames.remove", this.frameId);

      //also delete from app viex
      this.$emit("deleted", this.frameId);
    },
  },
};
</script>

<style scoped>
.mask {
  position: absolute;
  width: 400px;
  height: 400px;
  margin: 0;
}
p {
  width: 300px;
  overflow: clip;
  padding:5px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
}

.frame {
  width: 400px;
  height: 400px;
  display: inline-block;
}

.content {
  margin-top: 2%;
  margin-left: 2%;
  width: 96%;
  height: 96%;
  border-style: solid;
}

.buttonDelete {
  width: 30px;
  height: 30px;
}

.toggleHide,
.toggleShow {
  float: right;
  width: 50px;
  height: 100%;
}

.toggleShow {
  background-color: rgba(0, 255, 0, 0.2);
}
.toggleShow:hover {
  background-color: rgba(0, 255, 0, 0.5);
}

.toggleHide {
  background-color: rgba(255, 0, 0, 0.2);
}
.toggleHide:hover {
  background-color: rgba(255, 0, 0, 0.5);
}
</style>